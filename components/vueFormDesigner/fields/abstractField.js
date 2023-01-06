import {deepGet, debounce, uniqueId} from '../utils/helpers.js'
import validators from "../utils/validators";
import { slugifyFormID } from "../utils/schema";

function convertValidator(validator) {
	if (typeof validator === 'string') {
		if (validators[validator] != null) return validators[validator];
		else {
			console.warn(`'${validator}' is not a validator function!`);
			return null; // caller need to handle null
		}
	}
	return validator;
}

function attributesDirective(el, binding, vnode) {
	let attrs = deepGet(vnode.context, "schema.attributes", {});
	let container = binding.value || "input";
	if (typeof container === 'string') {
		attrs = deepGet(attrs, container) || attrs;
	}
	attrs.forEach((val, key) => {
		el.setAttribute(key, val);
	});
}

export default {
	props: ["vfg", "model", "schema", "formOptions", "disabled"],

	data() {
		return {
			errors: [],
			debouncedValidateFunc: null,
			debouncedFormatFunc: null
		};
	},

	directives: {
		attributes: {
			bind: attributesDirective,
			updated: attributesDirective,
			componentUpdated: attributesDirective
		}
	},

	computed: {
		value: {
			cache: false,
			get() {
				let val;
				if (typeof deepGet(this.schema, "get") === 'function') {
					val = this.schema.get(this.model);
				} else {
					val = deepGet(this.model, this.schema.model);
				}

				return this.formatValueToField(val);
			},

			set(newValue) {
				let oldValue = this.value;
				newValue = this.formatValueToModel(newValue);

				if (typeof newValue === 'function') {
					newValue(newValue, oldValue);
				} else {
					this.updateModelValue(newValue, oldValue);
				}
			}
		}
	},

	methods: {
		validate(calledParent) {
			this.clearValidationErrors();
			let validateAsync = deepGet(this.formOptions, "validateAsync", false);

			let results = [];

			if (this.schema.validator && this.schema.readonly !== true && this.disabled !== true) {
				let validators = [];
				if (!Array.isArray(this.schema.validator)) {
					validators.push(convertValidator(this.schema.validator).bind(this));
				} else {
					this.schema.validator.forEach(validator => {
						validators.push(convertValidator(validator).bind(this));
					});
				}

				validators.forEach(validator => {
					if (validateAsync) {
						results.push(validator(this.value, this.schema, this.model));
					} else {
						let result = validator(this.value, this.schema, this.model);
						if (result && typeof result.then == 'function') {
							result.then(err => {
								if (err) {
									this.errors = this.errors.concat(err);
								}
								let isValid = this.errors.length === 0;
								this.$emit("validated", isValid, this.errors, this);
							});
						} else if (result) {
							results = results.concat(result);
						}
					}
				});
			}

			let handleErrors = (errors) => {
				let fieldErrors = [];

                [...new Set(errors)].forEach(err => {
					if (Array.isArray(err) && err.length > 0) {
						fieldErrors = fieldErrors.concat(err);
					} else if (typeof err === 'string') {
						fieldErrors.push(err);
					}
				});
				if (typeof this.schema.onValidated === 'function') {
					this.schema.onValidated.call(this, this.model, fieldErrors, this.schema);
				}

				let isValid = fieldErrors.length === 0;
				if (!calledParent) {
					this.$emit("validated", isValid, fieldErrors, this);
				}
				this.errors = fieldErrors;
				return fieldErrors;
			};

			if (!validateAsync) {
				return handleErrors(results);
			}

			return Promise.all(results).then(handleErrors);
		},

		debouncedValidate() {
			if (typeof this.debouncedValidateFunc !== 'function') {
				this.debouncedValidateFunc = debounce(
					this.validate.bind(this),
					deepGet(this.schema, "validateDebounceTime", deepGet(this.formOptions, "validateDebounceTime", 500))
				);
			}
			this.debouncedValidateFunc();
		},

		updateModelValue(newValue, oldValue) {
			let changed = false;
			if (typeof this.schema.set === 'function') {
				this.schema.set(this.model, newValue);
				changed = true;
			} else if (this.schema.model) {
				this.setModelValueByPath(this.schema.model, newValue);
				changed = true;
			}

			if (changed) {
				this.$emit("model-updated", newValue, this.schema.model);

				if (typeof this.schema.onChanged === 'function') {
					this.schema.onChanged.call(this, this.model, newValue, oldValue, this.schema);
				}

				if (deepGet(this.formOptions, "validateAfterChanged", false) === true) {
					if (deepGet(this.schema, "validateDebounceTime", deepGet(this.formOptions, "validateDebounceTime", 0)) > 0) {
						this.debouncedValidate();
					} else {
						this.validate();
					}
				}
			}
		},

		clearValidationErrors() {
			this.errors.splice(0);
		},

		setModelValueByPath(path, value) {

			// convert array indexes to properties
			let s = path.replace(/\[(\w+)\]/g, ".$1");

			// strip a leading dot
			s = s.replace(/^\./, "");

			let model = this.model;
			const a = s.split(".");
			let i = 0;
			const n = a.length

			while (i < n) {
				let k = a[i];
				if (i < n - 1)
					if (model[k] !== undefined) {
						// Found parent property. Step in
						model = model[k];
					} else {
						// Create missing property (new level)
                        this.model[k] = {}
						model = model[k];
					}
				else {
					// Set final property value
                    this.model[k] = value
					return;
				}

				++i;
			}
		},

		getFieldID(schema, unique = false) {
			const idPrefix = deepGet(this.formOptions, "fieldIdPrefix", "");
			return slugifyFormID(schema, idPrefix) + (unique ? "-" + uniqueId() : "");
		},

		getFieldClasses() {
			return deepGet(this.schema, "fieldClasses", []);
		},

		formatValueToField(value) {
			return value;
		},

		formatValueToModel(value) {
			return value;
		}
	}
};

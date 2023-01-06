import {deepGet} from './utils/helpers.js'

export default {
	methods: {
		// Get style classes of field
		getFieldRowClasses(field) {
			const hasErrors = this.fieldErrors(field).length > 0;
			let baseClasses = {
				[deepGet(this.options, "validationErrorClass", "error")]: hasErrors,
				[deepGet(this.options, "validationSuccessClass", "valid")]: !hasErrors,
				disabled: this.fieldDisabled(field),
				readonly: this.fieldReadonly(field),
				featured: this.fieldFeatured(field),
				required: this.fieldRequired(field)
			};

			if (Array.isArray(field.styleClasses)) {
				field.styleClasses.forEach((styleClasses, c) => (baseClasses[c] = true));
			} else if (typeof field.styleClasses === 'string') {
				baseClasses[field.styleClasses] = true;
			}

			if (field.type !== null) {
				baseClasses["field-" + field.type] = true;
			}

			return baseClasses;
		},
		fieldErrors(field) {
			let res = this.errors.filter(e => e.field === field);
			return res.map(item => item.error);
		},
		// Get disabled attr of field
		fieldDisabled(field) {
			if (typeof field.disabled === 'function') return field.disabled.call(this, this.model, field, this);

			if (field.disabled == null) return false;

			return field.disabled;
		},
		// Get readonly prop of field
		fieldReadonly(field) {
			if (typeof field.readonly === 'function') return field.readonly.call(this, this.model, field, this);

			if (field.readonly == null) return false;

			return field.readonly;
		},
		// Get featured prop of field
		fieldFeatured(field) {
			if (typeof field.featured === 'function') return field.featured.call(this, this.model, field, this);

			if (field.featured == null) return false;

			return field.featured;
		},
		// Get required prop of field
		fieldRequired(field) {
			if (typeof field.required === 'function') return field.required.call(this, this.model, field, this);

			if (field.required == null) return false;

			return field.required;
		}
	}

}

<template>

    <div class="radio-list" :disabled="disabled">
        <label
            v-for="(item, idx) in items"
            :key="`radio-list-${idx}`"
            :class="getItemCssClasses(item)">
            <input
                :id="getFieldID(schema, true)"
                type="radio"
                :disabled="isItemDisabled(item)"
                :name="id"
                @click="onSelection(item)"
                :value="getItemValue(item)"
                :checked="isItemChecked(item)"
                :class="schema.fieldClasses"
                :required="schema.required"
                /> {{ getItemName(item) }}
            </label>
    </div>
</template>

<script>

import {deepGet} from '../../utils/helpers.js'
import abstractField from "../abstractField";

export default {
    name: 'FieldRadios',
	mixins: [abstractField],

	computed: {
		items() {
			let values = this.schema.values;
			if (typeof values == "function") {
				return values.apply(this, [this.model, this.schema]);
			} else {
				return values;
			}
		},
		id() {
			return this.schema.model;
		}
	},

	methods: {
		getItemValue(item) {
			if (item instanceof Object) {
				if (typeof this.schema["radiosOptions"] !== "undefined" && typeof this.schema["radiosOptions"]["value"] !== "undefined") {
					return item[this.schema.radiosOptions.value];
				} else {
					if (typeof item["value"] !== "undefined") {
						return item.value;
					} else {
						throw "`value` is not defined. If you want to use another key name, add a `value` property under `radiosOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/radios.html#radios-field-with-object-values";
					}
				}
			} else {
				return item;
			}
		},
		getItemName(item) {
			if (item instanceof Object) {
				if (typeof this.schema["radiosOptions"] !== "undefined" && typeof this.schema["radiosOptions"]["name"] !== "undefined") {
					return item[this.schema.radiosOptions.name];
				} else {
					if (typeof item["name"] !== "undefined") {
						return item.name;
					} else {
						throw "`name` is not defined. If you want to use another key name, add a `name` property under `radiosOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/radios.html#radios-field-with-object-values";
					}
				}
			} else {
				return item;
			}
		},
		getItemCssClasses(item) {
			return {
				"is-checked": this.isItemChecked(item),
				"is-disabled": this.isItemDisabled(item)
			};
		},
		onSelection(item) {
			this.value = this.getItemValue(item);
		},
		isItemChecked(item) {
			let currentValue = this.getItemValue(item);
			return currentValue === this.value;
		},
		isItemDisabled(item) {

			if (this.disabled) {
				return true;
			}

            if(item instanceof Object) {
                let disabled = deepGet(item, "disabled", false);
                if (typeof disabled === 'function') {
                    return disabled(this.model);
                }
                return disabled;
            }

            return false
		}
	}
};
</script>

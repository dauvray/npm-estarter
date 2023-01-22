<template>

    <div v-if='schema != null'
        class="vue-form-generator">
        <component
            v-if="schema.fields"
            :is="tag">
            <template
                v-for='(field, idx) in fields'
                :key="idx">

                <form-group
                    v-if='fieldVisible(field)'
                    ref="items"
                    :vfg="vfg"
                    :field="field"
                    :errors="errors"
                    :model="model"
                    :options="options"
                    @validated="onFieldValidated"
                    @model-updated="onModelUpdated">
                </form-group>

            </template>
        </component>

        <template v-for='(group, idx) in groups'
                :key="idx">
            <component
                :is="tag"
                :class='getFieldRowClasses(group)'>
                <legend v-if='group.legend'>{{ group.legend }}</legend>
                <template
                    v-for='(field, idx2) in group.fields'
                    :key="idx2">

                    <form-group
                        v-if='fieldVisible(field)'
                        ref="items"
                        :vfg="vfg"
                        :field="field"
                        :errors="errors"
                        :model="model"
                        :options="options"
                        @validated="onFieldValidated"
                        @model-updated="onModelUpdated">
                    </form-group>

                </template>
            </component>
        </template>

    </div>
</template>

<script>

    import formMixin from "./formMixin.js"
    import formGroup from "./formGroup.vue"
    import {deepGet} from '../../services/helpers.js'

    export default {

        name: "formGenerator",
        components: { formGroup },
        mixins: [formMixin],
        props: {
            schema: Object,
            model: Object,
            options: {
                type: Object,
                default() {
                    return {
                        validateAfterLoad: false,
                        validateAfterChanged: false,
                        fieldIdPrefix: "",
                        validateAsync: false,
                        validationErrorClass: "error",
                        validationSuccessClass: ""
                    };
                }
            },
            multiple: {
                type: Boolean,
                default: false
            },
            isNewModel: {
                type: Boolean,
                default: false
            },
            tag: {
                type: String,
                default: "fieldset",
                validator: function(value) {
                    return value.length > 0;
                }
            }
        },
        data() {
            return {
                vfg: this,
                errors: [] // Validation errors
            };
        },
        computed: {
            fields() {
                let res = [];
                if (this.schema && this.schema.fields) {
                    this.schema.fields.forEach( field => {
                        if (!this.multiple || field.multi === true) {
                            res.push(field)
                        }
                    })
                }
                return res
            },
            groups() {
                let res = [];
                if (this.schema && this.schema.groups) {
                    this.schema.groups.slice(0).forEach( group => {
                        res.push(group);
                    });
                }
                return res;
            }
        },
        watch: {
            // new model loaded
            model: function(newModel, oldModel) {
                if (oldModel === newModel)
                    // model property changed, skip
                    return;
                if (newModel != null) {
                    this.$nextTick(() => {
                        // Model changed!
                        if (this.options.validateAfterLoad === true && this.isNewModel !== true) {
                            this.validate();
                        } else {
                            this.clearValidationErrors();
                        }
                    });
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (this.model) {
                    // First load, running validation if neccessary
                    if (this.options.validateAfterLoad === true && this.isNewModel !== true) {
                        this.validate();
                    } else {
                        this.clearValidationErrors();
                    }
                }
            });
        },

        methods: {
            // Get visible prop of field
            fieldVisible(field) {
                if (typeof field.visible === "function") return field.visible.call(this, this.model, field, this);
                if (field.visible == null) return true;
                return field.visible;
            },
            // Child field executed validation
            onFieldValidated(res, errors, field) {
                // Remove old errors for this field
                this.errors = this.errors.filter(e => e.field !== field.schema);
                if (!res && errors && errors.length > 0) {
                    // Add errors with this field
                    errors.forEach(err => {
                        this.errors.push({
                            field: field.schema,
                            error: err
                        });
                    });
                }
                let isValid = this.errors.length === 0;
                this.$emit("validated", isValid, this.errors, this);
            },
            onModelUpdated(newVal, schema) {
                this.$emit("model-updated", newVal, schema);
            },
            // Validating the model properties
            validate(isAsync = null) {
                if (isAsync === null) {
                    isAsync = deepGet(this.options, "validateAsync", false);
                }
                this.clearValidationErrors();
                let fields = [];
                let results = [];
                this.$refs.items.forEach(child => {
                    if (typeof child.validate === "function") {
                        fields.push(child.$refs.child); // keep track of validated children
                        results.push(child.validate(true));
                    }
                });
                let handleErrors = errors => {
                    let formErrors = [];
                    errors.forEach((err, i) => {
                        if (Array.isArray(err) && err.length > 0) {
                            err.forEach( error => {
                                formErrors.push({
                                    field: fields[i].schema,
                                    error: error
                                });
                            });
                        }
                    });
                    this.errors = formErrors;
                    let isValid = formErrors.length === 0;
                    this.$emit("validated", isValid, formErrors, this);
                    return isAsync ? formErrors : isValid;
                };
                if (!isAsync) {
                    return handleErrors(results);
                }
                return Promise.all(results).then(handleErrors);
            },
            // Clear validation errors
            clearValidationErrors() {
                this.errors.splice(0);
                this.$refs.items.forEach(child => {
                    child.clearValidationErrors();
                });
            },
        }

    }



</script>

<style scoped>

</style>


<template>
    <textarea
        class="form-control"
        v-model="value"
        :id="getFieldID(schema)"
        :class="schema.fieldClasses"
        :disabled="disabled"
        :maxlength="schema.max"
        :minlength="schema.min"
        :placeholder="schema.placeholder"
        :readonly="schema.readonly"
        :required="schema.required"
        :rows="schema.rows || 2"
        :name="schema.inputName"
        ></textarea>
</template>

<script>
    import abstractField from "../abstractField";

    export default {
        name: 'FieldTextArea',
        mixins: [abstractField]
    };
</script>

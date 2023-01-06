<template>
    <input
        :id="getFieldID(schema)"
        type="checkbox"
        v-model="value"
        :autocomplete="schema.autocomplete"
        :disabled="disabled"
        :name="schema.inputName"
        :class="schema.fieldClasses"
        :required="schema.required"

    />
</template>

<script>
    import abstractField from "../abstractField";

    export default {
        name: 'FieldCheckbox',
        mixins: [abstractField]
    };
</script>


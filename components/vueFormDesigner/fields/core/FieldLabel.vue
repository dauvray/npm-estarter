<template>
    <span
        :id="getFieldID(schema)"
        :class="schema.fieldClasses"
        ></span> {{ value }}
</template>

<script>
import abstractField from "../abstractField";

export default {
    name: 'FieldLabel',
	mixins: [abstractField]
};
</script>


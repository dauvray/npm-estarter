<template>
    <div>
        <h1>Vue.js-Estarter</h1>
        <form>
            <vue-form-generator
                :schema="schema"
                :model="model"
                :options="formOptions"
                ></vue-form-generator>
        </form>
    </div>
</template>

<script>

    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'
    import VueFormGenerator from 'vuejs-estarter/components/vueFormDesigner/formGenerator.vue'

    export default {
        name: 'Home',
        mixins: [BaseMixin],
        components: {
            VueFormGenerator,
        },
        data() {
            return {
                model: {
                    created: '08/01/1973',
/*                     id: 1,
                    name: 'John Doe',
                    password: 'J0hnD03!x4',
                    skills: ['Javascript', 'VueJS'],
                    email: 'john.doe@gmail.com',
                    status: true */
                },

                schema: {
                    groups: [
                    {
                        legend: 'User Details',
                        fields: [
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'ID (disabled text field)',
                                model: 'id',
                                readonly: true,
                                disabled: true
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Name',
                                model: 'name',
                                id: 'user_name',
                                placeholder: 'Your name',
                                featured: true,
                                required: true
                            },
                            {
                                type: 'input',
                                inputType: 'email',
                                label: 'E-mail',
                                model: 'email',
                                placeholder: 'User\'s e-mail address'
                            },
                            {
                                type: 'input',
                                inputType: 'password',
                                label: 'Password',
                                model: 'password',
                                min: 6,
                                required: true,
                                hint: 'Minimum 6 characters',
                                validator: 'string'
                            }
                        ]
                    },
                     {
                        legend: 'Skills & Status',
                        fields: [
                            {
                                type: 'select',
                                label: 'Skills',
                                model: 'skills',
                                values: ['Javascript', 'VueJS', 'CSS3', 'HTML5']
                            },
                            {
                                type: 'checkbox',
                                label: 'Status',
                                model: 'status',
                                default: true
                            },
                            {
                                type: 'textArea',
                                label: 'Decription',
                                model: 'description',
                            },
/*                             {
                                type: "label",
                                label: "Created",
                                model: "created"
                            }, */
                            {
                                type: "radios",
                                label: "Very best friend",
                                model: "friend",
                                values: [
                                    "James",
                                    "Nadia",
                                    "Paul",
                                    "Christelle",
                                    "Marc",
                                    "Marie"
                                ]
                            },
                            {
                                type: "radios",
                                label: "Identify the dolphin's name from the photo",
                                model: "dolphin",
                                values: [
                                    { common_name: "White-beaked dolphin", binomial_nomenclature:"Lagenorhynchus albirostris" },
                                    { common_name: "Peale's dolphin", binomial_nomenclature:"Lagenorhynchus australis" },
                                    { common_name: "Northern right whale dolphin", binomial_nomenclature:"Lissodelphis borealis" },
                                    { common_name: "Common bottlenose dolphin", binomial_nomenclature:"Tursiops truncatus" },
                                    { common_name: "Long-beaked common dolphin", binomial_nomenclature:"Delphinus capensis" },
                                    { common_name: "Pacific white-sided dolphin", binomial_nomenclature:"Lagenorhynchus obliquidens" },
                                    { common_name: "Pantropical spotted dolphin", binomial_nomenclature:"Stenella attenuata" },
                                    { common_name: "Chilean dolphin", binomial_nomenclature:"Cephalorhynchus eutropia" }
                                ],
                                radiosOptions: {
                                    value:"binomial_nomenclature",
                                    name:"common_name"
                                }
                            },
                            {
                                type: "radios",
                                label: "Choose you product color",
                                model: "color",
                                values: [
                                    { name: "Deep Pink", value:"#FF1493" },
                                    { name: "Peach Puff", value:"#FFDAB9" },
                                    { name: "Dark Orange", value:"#FF8C00", disabled: (model) => {
                                        if(model.disableOrange) { return true; }
                                        return false;
                                    }},
                                    { name: "Light Green", value:"#90EE90", disabled: true }
                                ]
                            }
                        ]
                    }
                    ]
                },

                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            }
        },
        created() {
           this.setBreadcrumb([...this.$route.meta.breadcrumb])
        },
        computed: {

        },
        methods: {

        }
    }
</script>



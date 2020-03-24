<template>

    <div class="password-checker w-100">

        <div v-if="schema.isCheckstrength" >
            <a role="button" aria-haspopup="true" aria-expanded="false" @click="toggle">
                <i v-if="isPasswordSecure" class="fas fa-check-circle text-success" title="Votre mot de passe est valide"></i>
                <i v-else="true" class="fas fa-info-circle" title="Comment définir un bon mot de passe"></i>
            </a>

            <div class="infos">
                <transition name="infobox">
                    <div class="infos-container" v-if="isInfoOpen">
                        <span class="title">Un bon mot de passe doit contenir</span>
                        <ul>
                            <li v-for="rule in this.rules" class="message">
                            <span :class="{'text-success': rule.status}"><i  v-if="rule.status" class="fas fa-check"></i>
                             {{rule.name}}
                            </span>
                            </li>
                        </ul>
                    </div>
                </transition>
            </div>

        </div>

        <div class="password-checker-container">
            <div class="w-100">
                <input :type="type"
                       :name="schema.inputName"
                       class="form-control"
                       v-model="value"
                       @input="checkStrength"
                       autocomplete='password' />
            </div>
            <span toggle="#password-field"
                  style="margin-left:-25px"
                  :class="viewedClass"
                  @click="showPassword">
                </span>
        </div>

        <div v-if="schema.isCheckstrength">
            <div class="progress" style="height: 2px;">
                <div :class="[progressClass, progressStatusBn]"
                     role="progressbar"
                     :style="{ width: progress + '%' }"
                     :aria-valuenow="progress"
                     aria-valuemin="0"
                     aria-valuemax="100"></div>
            </div>
            <div id="result" :class="strengthStyle">
                <span>{{message}}</span>
            </div>
        </div>

    </div>
</template>

<script>
    import { abstractField } from "vue-form-generator";

    export default {
        name : 'PasswordComponent',
        mixins: [ abstractField ],
        data() {
            return {
                message: null,                          // alert message
                isViewed: false,                        // see plain text password
                type: 'password',                       // field type
                progress: 0,
                progressClass: 'progress-bar',
                progressStatusBn: null,
                strengthStyle: null,
                isPasswordSecure: false,                 // is password has good security level
                isInfoOpen: false,                       // is message info open
                rules: [
                    {
                        name: "7 caractères au minimum",
                        status: false
                    },
                    {
                        name: "des lettres minuscules et majuscules",
                        status: false
                    },
                    {
                        name: "des chiffres",
                        status: false
                    },
                    {
                        name: "des caractères spéciaux",
                        status: false
                    }
                ],
            }
        },
        props: {
            // name: {
            //     type: String,
            //     required: true
            // },
            // isCheckstrength: {
            //     type: Boolean,
            //     default: true
            // },
            // error: {
            //     type: Boolean,
            //     default: false
            // },
            // isRequired: {
            //     type: Boolean,
            //     default: false
            // }
        },
        mounted() {
            $(function () {
                $('[data-toggle="popover"]').popover()
            })
        },
        created() {

        },
        computed: {
            viewedClass() {
                if (this.isViewed) {
                    return 'far fa-eye toggle-password';
                } else {
                    return "far fa-eye-slash";
                }
            }
        },
        methods: {
            checkStrength() {

                // send changes to listeners
                this.$emit(`update:password-${this.name}`, this.password);

                if (!this.schema.isCheckstrength) {
                    return;
                }

                this.progress = 0;
                this.isPasswordSecure = false;

                if (this.value.length == 0) {
                    this.message = "";
                }
                if (this.value.length < 6) {
                    this.message = "Mot de passe trop court";
                }

                if (this.value.length > 7) {
                    this.progress += 20;
                    this.rules[0].status = true;
                } else {
                    this.rules[0].status = false;
                }
                // If this.password contains both lower and uppercase characters, increase strength value.
                if (this.value.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                    this.progress += 20;
                    this.rules[1].status = true;
                } else {
                    this.rules[1].status = false;
                }
                // If it has numbers and characters, increase strength value.
                if (this.value.match(/([a-zA-Z])/) && this.value.match(/([0-9])/)) {
                    this.progress += 20;
                    this.rules[2].status = true;
                } else {
                    this.rules[2].status = false;
                }
                // If it has one special character, increase strength value.
                if (this.value.match(/([!,%,&,@,#,$,\^,*,?,_,~])/)) {
                    this.progress += 20;
                    this.rules[3].status = true;
                } else {
                    this.rules[3].status = false;
                }
                // If it has two special characters, increase strength value.
                if (this.value.match(/(.*[!,%,&,@,#,$,\^,*,?,_,~].*[!,%,&,@,#,$,\^,*,?,_,~])/)) {
                    this.progress += 20;
                }
                // Calculated strength value, we can return messages
                // If value is less than 2
                switch (this.progress) {
                    case 0:
                        this.message = null;
                        this.strengthStyle = null
                        this.progressStatusBn = null;
                        break;
                    case 20:
                        this.message = "Très faible";
                        this.strengthStyle = "text-danger";
                        this.progressStatusBn = "bg-danger";
                        break;
                    case 30:
                        this.message = "Faible";
                        break;
                    case 40:
                        this.message = "Moyen";
                        this.strengthStyle = "text-warning";
                        this.progressStatusBn = "bg-warning";
                        break;
                    case 80:
                        this.message = "Très bien";
                        this.strengthStyle = "text-success";
                        this.progressStatusBn = "bg-success";
                        this.isPasswordSecure = true;
                        break;
                    case 100:
                        this.message = "Excellent";
                        this.strengthStyle = "text-success";
                        this.progressStatusBn = "bg-success";
                        break;
                }
            },
            showPassword() {
                this.type = this.type == 'password' ? 'text' : 'password';
                this.isViewed = !this.isViewed;
            },
            toggle() {
                this.isInfoOpen = !this.isInfoOpen;
            },
        }
    }
</script>

<style lang="scss" scoped>

    .infobox-enter-active, .infobox-leave-active{
        animation:  animateBox .5s;
    }

    .infobox-enter, .infobox-leave-to{
        animation:  animateBox .5s reverse;
    }

    @keyframes animateBox {
        0% { height: 0px;}
        100% { height: 150px;}
    }

    .password-checker{
        position: relative;

        A[role=button] {
            position: absolute;
            top: -25px;
            right: 0;
        }

        .infos{

            .infos-container {
                clear: both;
                padding: 10px;
                overflow: hidden;

                .title {
                    font-weight: bold;
                }

                UL {
                    margin-top: 5px;
                    margin-bottom: 0;
                }
            }
        }

        .password-checker-container{
            position: relative;

            span {
                margin-left: -25px;
                position: absolute;
                top: 30%;
                right: 35px;
            }
        }
    }

</style>

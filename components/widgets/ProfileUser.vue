<template>
    <div class="card">
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">
                    <h2 class="card-title">
                        <gravatar-widget :user="user" />
                        {{user.name }}
                    </h2>
                </li>
                <li class="list-group-item">
                    <h6 class="card-subtitle mb-2 text-muted">{{user.email}}</h6>
                </li>
                <li class="list-group-item">
                    Inscrit depuis le : {{user.created_at}}
                </li>
            </ul>
        </div>
        <div class="card-footer text-muted">
            <router-link :to="$estarterRoutes.user_edit">Modifier</router-link>
            <router-link :to="$estarterRoutes.user_delete">Supprimer</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProfileUser',
        components: {
            GravatarWidget: () => import('laravel-estarter/components/widgets/Gravatar'),
        },
        props: {
            user: {
                type: Object,
                required: true
            },
        }
    }
</script>

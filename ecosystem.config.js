module.exports = {
    apps: [{
        name: "stp35.ru",
        script: "yarn run server:prod",
        env: {
            NODE_ENV: "development"
        },
        env_production : {
            NODE_ENV: "production"
        },
        error_file: "err.log",
        out_file: "out.log",
        log_file: "combined.log",
        autorestart: true,
        watch: false,
        instance_var: "5020",
        append_env_to_name: true
    }]
}

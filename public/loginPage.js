"use strict";

const user = new UserForm;
user.loginFormCallback = (data) => {
    ApiConnector.login(data, (fn) => {
        console.log(fn);
        if (fn.success) {
            location.reload();
        } else {
            user.loginErrorMessageBox;
        }
    });
}

user.registerFormCallback = (data) => {
    ApiConnector.register(data, (fn) => {
        console.log(fn);
        if (fn.success) {
            location.reload();
        } else {
            user.registerErrorMessageBox;
        }
    });
}
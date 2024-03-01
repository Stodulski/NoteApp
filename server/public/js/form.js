$(document).ready(function () {
    
    $("#signInSelector").click(() => {
        $("#signInForm").css("display", "none");
        $("#signUpForm").css("display", "flex");
    });

    $("#signUpSelector").click(() => {
        $("#signInForm").css("display", "flex");
        $("#signUpForm").css("display", "none");
    });

    $("#submitSignIn").click((e) => {
        e.preventDefault();
        let username = $("#usernameSignIn").val();
        let password = $("#passwordSignIn").val();
        if (username.length > 0 && password.length > 0) {
            $.post(
                "/signin",
                {
                    username,
                    password,
                },
                (data) => {
                    if (data.error) {
                        $("#signInTitle")
                            .text(data.error)
                            .css("color", "#FF4545");
                    } else {
                        $("#signInTitle")
                            .text("Success.")
                            .css("color", "#4BB543");

                        setTimeout(() => {
                            window.location.href = "/";
                        }, 200);
                    }
                }
            );
        } else {
            $("#signInTitle")
                .text("Complete all inputs.")
                .css("color", "#FF4545");
        }
    });
    $("#submitSignUp").click((e) => {
        e.preventDefault();
        let username = $("#usernameSignUp").val();
        let password = $("#passwordSignUp").val();
        let repassword = $("#rePasswordSignUp").val();
        if (
            username.length > 0 &&
            password.length > 0 &&
            repassword.length > 0
        ) {
            $.post(
                "/signup",
                {
                    username,
                    password,
                    repassword,
                },
                (data) => {
                    if (data.error) {
                        $("#signUpTitle")
                            .text(data.error)
                            .css("color", "#FF4545");
                    } else {
                        $("#signUpTitle")
                            .text("Success.")
                            .css("color", "#4BB543");

                        setTimeout(() => {
                            window.location.href = "/";
                        }, 200);
                    }
                }
            );
        } else {
            $("#signUpTitle")
                .text("Complete all inputs.")
                .css("color", "#FF4545");
        }
    });
});

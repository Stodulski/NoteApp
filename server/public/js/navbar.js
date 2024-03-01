$(document).ready(function () {
    $(".navbar__logout").click(() => {
        let decision = confirm("Are you sure to logout?");
        if (decision === true) window.location.href = "/logout";
    });
});

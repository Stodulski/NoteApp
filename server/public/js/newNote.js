$(document).ready(function () {
    $("#submitNote").click((e) => {
        e.preventDefault();
        let title = $("#noteTitle").val();
        let desc = $("#noteDesc").val();
        if (title.length > 0 && desc.length > 0) {
            $.post(
                "/note/new",
                {
                    title,
                    desc,
                },
                (data) => {
                    if (data.savedNote) {
                        $("#formTitle").text("Success.").css("color", "#4BB543");
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 200);
                    } else {
                        $("#formTitle")
                            .text(data.error)
                            .css("color", "#FF4545");
                    }
                }
            );
        } else {
            $("#formTitle")
                .text(`Complete all inputs.`)
                .css("color", "#FF4545");
        }
    });
});

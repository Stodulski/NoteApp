$(document).ready(function () {
    $(".note").click((e) => {
        let note = e.currentTarget.id;
        if (e.target.className == "note__delete") {
            let decision = confirm("You are deleting a note.");
            if (decision === true) {
                $.post("/note/delete", { id: note }, (data, res) => {
                    if (data.deletedNote) {
                        e.currentTarget.remove();
                    }
                });
            }
        }
        if (e.target.className == "note__edit") {
            window.location.href = `/note/edit/${note}`;
        }
    });
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.currentTarget.id);
}

function dropToTurntable(ev) {
    ev.preventDefault();
    var record = document.getElementById(ev.dataTransfer.getData("text"));
    if (record) selectRecord(record);
}

function playRecord(ev) {
    var record = ev.currentTarget.closest(".vinyl");
    if (record) selectRecord(record);
}

function playRecordWithKeyboard(ev) {
    if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        playRecord(ev);
    }
}

function selectRecord(record) {
    var turntable = document.getElementById("turntable");
    var shelf = document.getElementById("shelf");
    var audio = document.getElementById("audioPlayer");
    var currentRecord = turntable.querySelector(".vinyl");

    if (!turntable || !shelf || !audio || !record) return;

    if (currentRecord && currentRecord !== record) {
        currentRecord.classList.remove("spinning");
        shelf.appendChild(currentRecord);
    }

    turntable.appendChild(record);
    record.classList.add("spinning");

    var placeholder = turntable.querySelector(".placeholder-text");
    if (placeholder) placeholder.style.display = "none";

    audio.src = record.dataset.song;
    audio.play().catch(error => {
        console.error("Não foi possível reproduzir a música:", error);
    });
}

function dropToShelf(ev) {
    ev.preventDefault();
    var record = document.getElementById(ev.dataTransfer.getData("text"));
    var shelf = document.getElementById("shelf");
    var turntable = document.getElementById("turntable");
    if (!record || !shelf || !turntable) return;

    if (record.parentElement === turntable) {
        record.classList.remove("spinning");
        var audio = document.getElementById("audioPlayer");
        audio.pause();
        audio.currentTime = 0;
    }

    shelf.appendChild(record);

    if (!turntable.querySelector(".vinyl")) {
        var placeholder = turntable.querySelector(".placeholder-text");
        if (placeholder) placeholder.style.display = "block";
    }
}
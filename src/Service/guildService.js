var bossNotification = function (bossnameshort, server, ch) {
    let message = "";
    let bossServer = "";
    let bossName = "";
    let d = new Date();
    d.setMonth(d.getMonth() + 1);
    let curr_date = d.getDate();
    let curr_month = d.getMonth();
    let curr_year = d.getFullYear();
    let nowDate = curr_date + "-" + curr_month + "-" + curr_year;

    if (server == "val") {
        bossServer = "บาเลนเซีย-";
    }
    else if (server == "ser") {
        bossServer = "เซเรนเดีย-";
    }
    else if (server == "cal") {
        bossServer = "คาลเพออน-";
    }
    else if (server == "med") {
        bossServer = "เมเดีย-";
    }
    else if (server == "bal") {
        bossServer = "บาเลนอส-";
    }
    else if (server == "hei") {
        bossServer = "ไฮเดล-";
    }
    else if (server == "kam") {
        bossServer = "คามาซิเวีย-";
    }
    else {

    }

    if (bossnameshort = "vell") {
        bossName = "เบลล์";
    }
    var html = [];
    html.push(
        "```ml\n",
        "---- World Boss Notification ----",
        "\n",
        ">> ประกาศตีบอสประจำวันที่ : " + nowDate,
        "\n",
        ">> รวมตัวกัน ณ. : " + bossServer + ch,
        "\n",
        ">> บอส : " + bossName,
        "\n",
        "\n",
        "--- หากไปกันเป็นปาร์ตี้ ให้นำตัว LV.54+ ไปนะครับเดี๋ยวของไม่ดรอป ---",
        "\n",
        "--- บอส เบล เรือกิลออก 14.30 น. บริหารเวลากันด้วย (ถ้าพี่ตี้อยู่มีคอล) ---",
        "\n",
        "\n",
        "```",
    );
    return html.join("");
};

var notifyNode = function (warServer) {

    let message = "";
    let d = new Date();
    d.setMonth(d.getMonth() + 1);
    let curr_date = d.getDate();
    let curr_month = d.getMonth();
    let curr_year = d.getFullYear();
    let nowDate = curr_date + "-" + curr_month + "-" + curr_year;
    let notiWarServer = "";
    if (warServer == "val") {
        notiWarServer = "บาเลนเซีย-1";
    }
    else if (warServer == "ser") {
        notiWarServer = "เซเรนเดีย-1";
    }
    else if (warServer == "cal") {
        notiWarServer = "คาลเพออน-1";
    }
    else if (warServer == "med") {
        notiWarServer = "เมเดีย-1";
    }
    else if (warServer == "bal") {
        notiWarServer = "บาเลนอส-1";
    }
    else if (warServer == "nw") {
        notiWarServer = " ไม่มีวอ / ไม่ได้ปักโหนด หากิลรับจ้างตามอัธยาศัย ";
    }
    else {
        notiWarServer = " ไม่มีวอ / ลืมปักโหนด ";
    }

    var html = [];
    html.push(
        "```ml\n",
        "---- Node War Notification ----",
        "\n",
        ">> วอโหนดประจำวันที่ : " + nowDate,
        "\n",
        ">> ณ. : " + notiWarServer,
        "\n",
        "\n",
        "--- อย่าลืม Join War เพื่อรับเหรียญฟรีกันด้วยนะครับ ---",
        "\n",
        "--- หากไม่ได้แจ้งลงเล่น แปลว่า ปักป้อมฟรีเด้อ ---",
        "\n",
        "\n",
        "```",

    );
    return html.join("");
}
module.exports.notifyNode = notifyNode;
module.exports.bossNotification = bossNotification;
    var caphrasStoneIII = function () {
        var html = [];
        html.push(
            "```ml\n",
            "---- Caphras Stone ----",
            "\n",
            "\n",
            "III -> IV",
            "\n",
            "\n",
            "--> ไอเท็มสีเขียว (อาวุธ) : ~500 ",
            "\n",
            "--> ไอเท็มสีเขียว (เกราะ) : ~400 ",
            "\n",
            "\n",
            "--> ไอเท็มสีฟ้า (อาวุธ) : ~1,150 ",
            "\n",
            "--> ไอเท็มสีฟ้า (เกราะ) : ~600 ",
            "\n",
            "\n",
            "--> ไอเท็มบอส (อาวุธ) : ~2,000 ",
            "\n",
            "--> ไอเท็มบอส (เกราะ) : ~1,500 ",
            "\n",
            "\n",
            "https://saarith.com/black-desert-online-caphras-stone-explained/",
            "\n",
            "```",
        );
        return html.join("");

    }

    var caphrasStoneIV = function () {
        var html = [];
        html.push(
            "```ml\n",
            "---- Caphras Stone ----",
            "\n",
            "IV -> V ",
            "\n",
            "\n",
            "--> ไอเท็มสีเขียว (อาวุธ) : ~4,000 ",
            "\n",
            "--> ไอเท็มสีเขียว (เกราะ) : ~2,000 ",
            "\n",
            "\n",
            "--> ไอเท็มสีฟ้า (อาวุธ) : ~11,000 ",
            "\n",
            "--> ไอเท็มสีฟ้า (เกราะ) : ~3,700 ",
            "\n",
            "\n",
            "--> ไอเท็มบอส (อาวุธ) : ~18,000 ",
            "\n",
            "--> ไอเท็มบอส (เกราะ) : ~10,000 ",
            "\n",
            "\n",
            "https://saarith.com/black-desert-online-caphras-stone-explained/",
            "\n",
            "```",
        );
        return html.join("");

    }

    var weaponArmorEnhancement = function (currentEnhacement, currentFS) 
    {

        var html = [];
        var message = " Current enchance is: - [CurrentEnchance] " + "\n" +
            " Number of Failstacks - [CurrentFS] " + "\n" +

            " Aim enchance: - [AimEnchance] " + "\n" +
            " Total chance with current failstacks - [calculateChanceFS]% " + "\n" +

            " Max failstack cap - [MaxFSCap] " + "\n" +
            " Base chance for upgrade - [BasePercent]% " + "\n" +
            " Upgrade percentage cap - [UpgradePercent]% " + "\n" +
            " Percent increase each failstack - [PercentIncreasePerFS]% ";

        let calculateChanceFS = 0;
        let maxFSCap = 0;
        let basePercent = 0;
        let upgradePercent = 0;
        let percentIncreasePerFS = 0;
        let nextEnhacement = 0;
        nextEnhacement =  Number(currentEnhacement)+1;
        console.log(nextEnhacement);


        //#region  Base %
        let base_1_7 = 100;
        let base_8 = 20;
        let base_9 = base_8 - 2.5;
        let base_10 = base_9 - 2.5;
        let base_11 = base_10 - 2.5;
        let base_12 = base_11 - 2.5;
        let base_13 = base_12 - 2.5;
        let base_14 = base_13 - 2.5;
        let base_15 = base_14 - 2.5;

        let base_16 = 15;
        let base_17 = 7.5;
        let base_18 = 5;
        let base_19 = 2;
        let base_20 = 1.5;
        //#endregion

        //#region Per Stack %
        let add_base_8 = 2.5;
        let add_base_9 = 2;
        let add_base_10 = 1.5;
        let add_base_11 = 1.25;
        let add_base_12 = 0.75;
        let add_base_13 = 0.63;
        let add_base_14 = 0.5;
        let add_base_15 = 0.5;

        let add_base_16 = 1.5;
        let add_base_17 = 0.75;
        let add_base_18 = 0.5;
        let add_base_19 = 0.25;
        let add_base_20 = 0.15;
        //#endregion

        //#region Max Fail %
        let maxfail_8 = 13;
        let maxfail_9 = 14;
        let maxfail_10 = 15;
        let maxfail_11 = 16;
        let maxfail_12 = 18;
        let maxfail_13 = 20;
        let maxfail_14 = 25;
        let maxfail_15 = 25;
        let maxfail_16 = 25;
        let maxfail_17 = 35;
        let maxfail_18 = 44;
        let maxfail_19 = 90;
        let maxfail_20 = 124;
        //#endregion

        //#region Max  %
        let maxPer_8 = 52.50;
        let maxPer_9 = 45.50;
        let maxPer_10 = 37.50;
        let maxPer_11 = 32.50;
        let maxPer_12 = 23.50;
        let maxPer_13 = 20.10;
        let maxPer_14 = 17.50;
        let maxPer_15 = 15.00;
        let maxPer_16 = 52.50;
        let maxPer_17 = 33.75;
        let maxPer_18 = 27.00;
        let maxPer_19 = 24.50;
        let maxPer_20 = 20.10;
        //#endregion

        //currentEnhacement - currentFS

        //  
        if (currentEnhacement == 1 || currentEnhacement == 2 || currentEnhacement == 3 || currentEnhacement == 4 || currentEnhacement == 5 || currentEnhacement == 6) {
            calculateChanceFS = base_1_7;
            maxFSCap = "-";
            basePercent = "-";
            upgradePercent = "-";
            percentIncreasePerFS = "-";
        }
        else if(currentEnhacement == 7)
        {
            calculateChanceFS = currentEnhacement > maxfail_8 ? maxPer_8 : base_8 + (add_base_8 * currentFS);
            maxFSCap = maxfail_8;
            basePercent = base_8;
            upgradePercent = maxPer_8;
            percentIncreasePerFS = add_base_8;
        }
        else if(currentEnhacement == 8)
        {
            calculateChanceFS = currentEnhacement > maxfail_9 ? maxPer_9 : base_9 + (add_base_9 * currentFS);
            maxFSCap = maxfail_9;
            basePercent = base_9;
            upgradePercent = maxPer_9;
            percentIncreasePerFS = add_base_9;
        }
        else if(currentEnhacement == 9)
        {
            calculateChanceFS = currentEnhacement > maxfail_10 ? maxPer_10 : base_10 + (add_base_10 * currentFS);
            maxFSCap = maxfail_10;
            basePercent = base_10;
            upgradePercent = maxPer_10;
            percentIncreasePerFS = add_base_10;
        }
        else if(currentEnhacement == 10)
        {
            calculateChanceFS = currentEnhacement > maxfail_11 ? maxPer_11 : base_11 + (add_base_11 * currentFS);
            maxFSCap = maxfail_11;
            basePercent = base_11;
            upgradePercent = maxPer_11;
            percentIncreasePerFS = add_base_11;
        }
        else if(currentEnhacement == 11)
        {
            calculateChanceFS = currentEnhacement > maxfail_12 ? maxPer_12 : base_12 + (add_base_12 * currentFS);
            maxFSCap = maxfail_12;
            basePercent = base_12;
            upgradePercent = maxPer_12;
            percentIncreasePerFS = add_base_12;
        }
        else if(currentEnhacement == 12)
        {
            calculateChanceFS = currentEnhacement > maxfail_13 ? maxPer_13 : base_13 + (add_base_13 * currentFS);
            maxFSCap = maxfail_13;
            basePercent = base_13;
            upgradePercent = maxPer_13;
            percentIncreasePerFS = add_base_13;
        }
        else if(currentEnhacement == 13)
        {
            calculateChanceFS = currentEnhacement > maxfail_14 ? maxPer_14 : base_14 + (add_base_14 * currentFS);
            maxFSCap = maxfail_14;
            basePercent = base_14;
            upgradePercent = maxPer_14;
            percentIncreasePerFS = add_base_14;
        }
        else if(currentEnhacement == 14)
        {
            calculateChanceFS = currentEnhacement > maxfail_15 ? maxPer_15 : base_15 + (add_base_15 * currentFS);
            maxFSCap = maxfail_15;
            basePercent = base_15;
            upgradePercent = maxPer_15;
            percentIncreasePerFS = add_base_15;
        }
        else if(currentEnhacement == 15)
        {
            calculateChanceFS = currentEnhacement > maxfail_16 ? maxPer_16 : base_16 + (add_base_16 * currentFS);
            maxFSCap = maxfail_16;
            basePercent = base_16;
            upgradePercent = maxPer_16;
            percentIncreasePerFS = add_base_16;
        }
        else if(currentEnhacement == 16)
        {
            calculateChanceFS = currentEnhacement > maxfail_17 ? maxPer_17 : base_17 + (add_base_17 * currentFS);
            maxFSCap = maxfail_17;
            basePercent = base_17;
            upgradePercent = maxPer_17;
            percentIncreasePerFS = add_base_17;
        }
        else if(currentEnhacement == 17)
        {
            calculateChanceFS = currentEnhacement > maxfail_18 ? maxPer_18 : base_18 + (add_base_18 * currentFS);
            maxFSCap = maxfail_18;
            basePercent = base_18;
            upgradePercent = maxPer_18;
            percentIncreasePerFS = add_base_18;
        }
        else if(currentEnhacement == 18)
        {
            calculateChanceFS = currentEnhacement > maxfail_19 ? maxPer_19 : base_19 + (add_base_19 * currentFS);
            maxFSCap = maxfail_19;
            basePercent = base_19;
            upgradePercent = maxPer_19;
            percentIncreasePerFS = add_base_19;
        }
        else if(currentEnhacement == 19)
        {
            calculateChanceFS = currentEnhacement > maxfail_20 ? maxPer_20 : base_20 + (add_base_20 * currentFS);
            maxFSCap = maxfail_20;
            basePercent = base_20;
            upgradePercent = maxPer_20;
            percentIncreasePerFS = add_base_20;
        }

        message = message.replace("[CurrentEnchance]", currentEnhacement)
                         .replace("[CurrentFS]", currentFS)
                         .replace("[AimEnchance]", Number(currentEnhacement)+1)
                         .replace("[calculateChanceFS]", calculateChanceFS) // Calculate Fail 
                         .replace("[MaxFSCap]", maxFSCap)
                         .replace("[BasePercent]", basePercent)
                         .replace("[UpgradePercent]", upgradePercent)
                         .replace("[PercentIncreasePerFS]", percentIncreasePerFS);

            // html.push(message);
            // return html.join("");

            html.push(
                "```ml\n",
                "---- อัตราความสำเร็จในการตีบวก ----",
                "\n",
                "\n",
                " ปัจจุบัน อาวุธ/เครื่องป้องกัน บวกอยู่ที่ : " + currentEnhacement , 
                "\n",
                " จำนวน Failstack ที่มี ณ ปัจจุบัน : " + currentFS,
                "\n",
                "\n",
                " เป้าหมายที่จะตีบวกอยู่ที่ : " + nextEnhacement, 
                "\n",
                " อัตราความสำเร็จในการตีบวก : " + calculateChanceFS + "%", 
                "\n",
                "\n",
                " Failstack สูงสุดในขั้นตีบวกนี้ : " + maxFSCap, 
                "\n",
                " ค่าความสำเร็จ (ตั้งต้น) คิดเป็น : " + basePercent + "%", 
                "\n",
                " ค่าความสำเร็จสูงสุดใน้นตีบวกนี้ : " + upgradePercent + "%", 
                "\n",
                " โอกาสเพิ่มความสำเร็จต่อ Failstack : " + percentIncreasePerFS + "%",
                "\n",
                "\n",
                "\n",
                " ที่มา : https://www.reddit.com/r/blackdesertonline/comments/6bb46x/yet_another_enchanting_calculator/",
                "\n",
                " *****  คำเตือน แค่ช่วยในการตัดสินใจนะ ไม่ได้หมายถึงว่า จะติด 100% เด้อ !!!!!! ***** ",
                "\n",
                "```",
            );
            return html.join("");
    }


    module.exports.caphrasStoneIII = caphrasStoneIII;
    module.exports.caphrasStoneIV = caphrasStoneIV;
    module.exports.weaponArmorEnhancement = weaponArmorEnhancement;
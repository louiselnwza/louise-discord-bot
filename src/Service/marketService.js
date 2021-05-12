const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

var checkPrice = function (priceOfSell, total) {

    let marketTax = 0.35;
    let returnMoneyWithPack = 0.3;

    let summaryAmount = (priceOfSell*total);
    let totalAmount = summaryAmount-(summaryAmount*marketTax);
    let totalAmountReturn = totalAmount+ (totalAmount*returnMoneyWithPack);

    var html = [];
    html.push(
        "```ml\n",
        "---- Market Price Calculator ----",
        "\n",
        "ราคาของสินค้า : " + formatter.format(priceOfSell),
        "\n",
        "จำนวนที่วางขาย : " +  total ,
        "\n",
        "\n",
        "ราคารวมก่อนหักภาษี : " + formatter.format(summaryAmount),
        "\n",
        "ราคารวม หักภาษี (ไม่มีห่อสารพัดประโยชน์) : " + formatter.format(totalAmount),
        "\n",
        "ราคารวม หักภาษี (มีห่อสารพัดประโยชน์) : " + formatter.format(totalAmountReturn),
        "\n",
        "\n",
        "ปล. อย่าลืมนะว่าเงินที่ได้เพิ่มเติมจากห่อสารพัดประโยชน์จะไม่ถูกรวมแสดงให้เห็นตอนไปเอาเงินนะแต่มันจะเด้งเข้าตัวให้",
        "```",

    );
    return html.join("");
};

var preOrderCheckPrice = function (priceOfSell, priceOfPreOrder) {

    let preLow = 0.2;
    let ahLow = 0.8;
    let ahHigh = 1.4;
    let marketTax = 0.65;
    let ValuePackReturn = 0.3;
    let calculate3xPriceOfSell = priceOfSell*3;
   // let calculate3xPreOrder = priceOfPreOrder*3;
    let message;
    let totalPriceWithPack = 0;
    let totalPriceWithOutPack = 0;
    if(priceOfPreOrder < calculate3xPriceOfSell)
    {
        message = "ราคา Pre-Order น้อยกว่าราคา AH 3 เท่า";
        totalPriceWithOutPack = ((ahLow * priceOfSell) + (preLow*priceOfPreOrder))* marketTax
        totalPriceWithPack =   totalPriceWithOutPack + (totalPriceWithOutPack*ValuePackReturn);
    }
    else
    {
        message = "ราคา Pre-Order มากกว่าราคา AH 3 เท่า";
        totalPriceWithOutPack = ((ahHigh*priceOfSell*marketTax))
        totalPriceWithPack =   totalPriceWithOutPack + (totalPriceWithOutPack*ValuePackReturn);
    }

    var html = [];
    html.push(
        "```ml\n",
        "---- Pre-Order Market Price Calculator ----",
        "\n",
        "ราคาของสินค้าที่วางขายใน AH : " + formatter.format(priceOfSell),
        "\n",
        "ราคาของสินค้าที่ทำการ Pre-Order : " + formatter.format(priceOfPreOrder),
        "\n",
        "เข้าเงื่อนไข : >>> " +  message + " <<<" ,
        "\n",
        "\n",
        "จำนวนเงินที่ได้ (Value Pack) : " + formatter.format(totalPriceWithPack),
        "\n",
        "จำนวนเงินที่ได้ (Non - Value Pack) : " + formatter.format(totalPriceWithOutPack),
        "\n",
        "Cr. แจกกระสุน & https://blackdesertanalytics.netlify.com",
        "```",
    );
    return html.join("");

}

module.exports.checkPrice = checkPrice;
module.exports.preOrderCheckPrice = preOrderCheckPrice;
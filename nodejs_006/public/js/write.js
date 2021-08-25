
    const fontNames = [
        "맑은 고딕",
        "궁서",
        "굴림",
        "바탕체",
        "돋움체",
        "Arial",
        "Arial Black",
        "Comic Sans MS",
        "Courier New",
    ];

    const fontSizes = [
        "8",
        "9",
        "10",
        "11",
        "12",
        "14",
        "16",
        "18",
        "20",
        "24",
        "30",
        "36",
        "40",
        "48",
        "52",
        "72",
    ];
    const toolbar = [
        "fontname",
        "fontsize",
        "style",
        "color",
        "table",
        "height",
        ["para",["ul", "ol"]],
        ["view",["fullscreen", "help"]],
        ["insert", ["link"]],
    ];

    $("#b_text").summernote({
        lang:"ko-KR",
        toolbar,
        fontNames : fontNames,        
        placeholder : "본문을 입력하세요",
        width : "90%",
        height : "300px",
    });
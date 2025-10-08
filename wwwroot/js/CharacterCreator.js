// Character carousel JS (Dynamic using jQuery + API)
$(document).ready(function () {

    var hairImages = [];
    var faceImages = [];
    var clothingImages = [];

    // Load images dynamically from API
    function loadImages(apiUrl, targetArray, callback) {
        $.getJSON(apiUrl)
            .done(function (data) {
                $.each(data, function (i, item) {
                    targetArray.push(item);
                });
                if (callback) {
                    callback();
                }
            })
            .fail(function () {
                console.error("Failed to load images from " + apiUrl);
            });
    }

    // Change the image for the given category
    function changeImage(target, direction) {
        var imagesMap = {
            hair: hairImages,
            face: faceImages,
            clothing: clothingImages
        };

        var $img = $("#" + target);            // the <img> element
        var $input = $("#" + target + "Input"); // hidden input
        var images = imagesMap[target];

        if (images.length === 0) {
            return; // No images loaded yet
        }

        var currentValue = $input.val();
        var index = $.inArray(currentValue, images);
        if (index === -1) index = 0;

        if (direction === "next") {
            index = (index + 1) % images.length;
        } else {
            index = (index - 1 + images.length) % images.length;
        }

        $img.attr("src", "/images/" + target + "/" + images[index]);
        $input.val(images[index]);
    }

    // Button click handlers
    $(".next").click(function () {
        var target = $(this).data("target");
        changeImage(target, "next");
    });

    $(".prev").click(function () {
        var target = $(this).data("target");
        changeImage(target, "prev");
    });

    // Load all image categories
    loadImages("/api/hair", hairImages, function () {
        if (hairImages.length > 0) {
            $("#hair").attr("src", "/images/hair/" + hairImages[0]);
            $("#hairInput").val(hairImages[0]);
        }
    });

    loadImages("/api/faces", faceImages, function () {
        if (faceImages.length > 0) {
            $("#face").attr("src", "/images/faces/" + faceImages[0]);
            $("#faceInput").val(faceImages[0]);
        }
    });

    loadImages("/api/clothes", clothingImages, function () {
        if (clothingImages.length > 0) {
            $("#clothing").attr("src", "/images/clothes/" + clothingImages[0]);
            $("#clothingInput").val(clothingImages[0]);
        }
    });
});


function imageListAdd(imageList, image) {
    array_push_new(imageList, image, function(a, b) { return a[0] == b[0]; });   
}

function getFemales() {
    var imageList = extractFemales();
    var lb = new Lightbox();
    lb.setImageList(imageList);
    lb.start();
}

function extractFemales() {
    var array = [];
    if (/provocateur/.test(document.location.href)) {
        array = agentProvocateurFemales();
    } else if (/macys/.test(document.location.href)) {
        array = macysFemales();
    } else if (/bravoerotica/.test(document.location.href)) {
        array = bravoEroticaFemales();
    } else if (/barenecessities/.test(document.location.href)) {
        array = bareNecessitiesFemales();
    }

    return array;
}

function bareNecessitiesFemales() {
    var array = [];
    var prefix = 'http://scene.barenecessities.com.edgesuite.net/is/image/BareNecessities/';
    var suffix = '?hei=1600';
    
    var productTitle = document.title.replace(/ .?.?[0-9]+.?.? at .*/, '');

    console.log("Found female wearing", productTitle);
    
    var mainImgDiv = document.getElementById('prodImg');
    var alternateImgDivs = document.getElementsByClassName('prodview');
    var divs = Array.prototype.slice.call(alternateImgDivs);
    divs.unshift(mainImgDiv);
                                        
    if (divs) {
        for (var i = 0; i < divs.length; i++) {
            var imgs = divs[i].getElementsByTagName('img');
            if (imgs && imgs.length > 0) {
                var img = imgs[0];
                var imageCode = img.src.replace(/\?.*/, '').replace(/.*BareNecessities\//, '');
                var titleSuffix = '';
                var matches = img.title.match(/ in .*/);
                if (matches && matches.length > 0) {
                    titleSuffix = matches[0];
                }
                var imageUrl = prefix + imageCode + suffix;
                var imageName = productTitle + titleSuffix;
                imageListAdd(array, [imageUrl, imageName]);
            }
        }
    }                                              
    return array;
}

function bravoEroticaFemales() {
    var array = [];
    var prefix = '';
    var suffix = '';
    
    var matches = document.location.href.match(/[-a-z]*\/[-a-z]*\/$/i);
    var productTitle = matches ? matches[0] : "Maadi";
    productTitle = productTitle.replace(/\/$/, '');
    productTitle = productTitle.replace(/\//g, ' ');

    console.log("Found female: ", productTitle);
    
    var divs = document.getElementsByClassName('thumb_box');
    var counter = 1;
    if (divs) {
        for (var i = 0; i < divs.length; i++) {
            var imgs = divs[i].getElementsByTagName('img');
            if (imgs) {
                for (var j = 0; j < imgs.length; j++) {
                    var imgname = productTitle + (counter < 10 ? " 0" : " ") + counter++;
                    var imgurl = imgs[j].src;
                    imgurl = imgurl.replace("t.jpg", ".jpg");
                    imageListAdd(array, [imgurl, imgname]);
                }
            }

        }
    }

    return array;
}
                                        
function macysFemales() {
    var array = [];
    var prefix = 'http://slimages.macys.com/is/image/MCY/products/';
    var suffix = '?hei=1600';
    
    var productTitle = document.getElementById('productTitle').innerHTML.trim();
    var garmentType = productTitle.match(/([a-z]*),/i)[1];
    productTitle = productTitle.replace(/ [a-z]*,/i, '') + ' ' + garmentType;
    
    console.log("Found female wearing", productTitle);
    
    var mainFemale = document.getElementsByTagName('body')[0].innerHTML.match(/imgList[^;]*;/);
    if (mainFemale) {
        var mainFemaleViews = mainFemale[0].match(/[0-9]\/optimized\/[0-9]*_fpx.tif/g);
        for (var i = 0; mainFemaleViews && i < mainFemaleViews.length; i++) {
            imageListAdd(array, [prefix + mainFemaleViews[i] + suffix, productTitle]);
        }
    }
    
    var alsoShopped = document.getElementById('cmIO_PDPZ1');
    if (alsoShopped) {
        var moreFemales = alsoShopped.innerHTML.match(/[0-9]\/optimized\/[0-9]*_fpx.tif/g);
        for (var i = 0; moreFemales && i < moreFemales.length; i++) {
            imageListAdd(array, [prefix + moreFemales[i] + suffix, productTitle]);
        }
    }
    
    return array;
}
                                        
function agentProvocateurFemales() {
    var array = [];
    var prefix = 'http://www.agentprovocateur.com';
    var suffix = '';
    
    var productTitle = '';
    var titleElements = document.getElementsByClassName('current');
    for (var i = 0; i < titleElements.length; i++) {
        var el = titleElements[i];
        if (el.tagName == 'LI') {
            productTitle = el.innerHTML.trim();
            break;
        }
    }
    
    console.log("Found female wearing", productTitle);
    
    var imageTags = document.getElementsByTagName('img');
    for (var i = 0; i < imageTags.length; i++) {
        var imageSource = imageTags[i].src;
        if (imageSource) {
            var matches = imageSource.match(/\/images\/dynamic\/i\/[0-9]+x[0-9]+\/[0-9a-z]*.jpg/);
            if (matches) {
                var imageCode = matches[0].replace(/\/[0-9]+x[0-9]+\//, '\/');
                imageListAdd(array, [prefix + imageCode + suffix, productTitle]);
            }
        }
    }
                                                   
    return array;
}

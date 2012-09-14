function sort_unique(arr, comparer) {
    var result = [];
    if (arr.length > 0) {
        arr = arr.sort(comparer);
        for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate
            if (comparer(arr[i-1], arr[i]) !== 0) {
                result.push(arr[i]);
            }
        }
    }
    return result;
}

function array_contains(arr, value, equality) {
    for (var i = 0; i < arr.length; i++) {
        if (equality(value, arr[i])) {
            return true;
        }   
    }
    return false;
}

function array_push_new(array, elm, equality) {
    if (!array_contains(array, elm, equality))
    {
        array.push(elm);
    }
}

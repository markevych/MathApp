exports.numFib = function(ind) {    
    if (ind == 1 || ind == 2)
    {
        return 1;
    }
    else
    {
        var f = 2;
        var prev = 1;
        
        for (var i = 2; i < ind; ++i)
        {
            var temp = f;
            f += prev;
            prev = temp;
        }
        
        return f;
    }
};
// // Constructor
// Vec3 = function( x, y, z )
// {
//     this.x = x;
//     this.y = y;
//     this.z = z;
// }

// // Add method
// Vec3.prototype.add = function( v )
// {
//     this.x += v.x;
//     this.y += v.y;
//     this.z += v.z;
//     return this;
// }

// // Sum method
// Vec3.prototype.sum = function()
// {
//     return this.x + this.y + this.z;
// }


/////////////////////////////////////////////////////

class Vec3
{
    // Constructor
    constructor( x, y, z )
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add ( v )
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    sum ()
    {
        return this.x + this.y + this.z;
    }

    ////// Task 2 //////
    min()
    {
        var min = this.x;
        if (min > this.y) min = this.y;
        if (min > this.z) min = this.z;
        return min;
    }

    max()
    {
        var max = this.x;
        if (max < this.y) max = this.y;
        if (max < this.z) max = this.z;
        return max;
    }

    mid()
    {
        return this.sum() - this.min() - this.max();
    }
}
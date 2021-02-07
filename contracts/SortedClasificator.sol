// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.4 <0.9.0;
pragma experimental ABIEncoderV2;

import "./IClasify.sol";

contract SortedClasificator is IClasify{
    
    function createClasation(DataTypes.Candidate[] memory data) external override returns(DataTypes.Candidate[] memory) {
       quickSort(data, int(0), int(data.length - 1));
       return data;
    }
    
    function quickSort(DataTypes.Candidate[] memory arr, int left, int right) internal{
        int i = left;
        int j = right;
        if(i==j) return;
        DataTypes.Candidate memory pivot = arr[uint(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint(i)].Grade < pivot.Grade) i++;
            while (pivot.Grade < arr[uint(j)].Grade) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, left, j);
        if (i < right)
            quickSort(arr, i, right);
    }
}
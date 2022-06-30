// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8; 

contract SimpleStorage { 
    uint256 public favoriteNumber;


    function store(uint256 _favoriteNumber) public virtual { 
            favoriteNumber = _favoriteNumber;
        }


   function retrieve() public view returns (uint256){
    return favoriteNumber; 
   }


    mapping(string=>uint256) public ageOfPerson;
   
    
    struct People { // similar js obj 
        uint256 age;
        string name;
    }


    People[] public people; // array of People 

   

   function addPeople(string memory _name,uint256 _age)public{
       people.push(People({name:_name,age:_age})); 
       ageOfPerson[_name] = _age;
   }


   function retrievePeople(string memory _name)public view returns(uint256){
       return ageOfPerson[_name];
   }
  
}


 
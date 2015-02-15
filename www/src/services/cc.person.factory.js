(function() {
  'use strict';

  angular
    .module('ccProavus')
    .factory('ccPersonFcty', ccPersonFcty);

	ccPersonFcty.$inject = ['$resource', 'lodash'];

  /* @ngInject */
  function ccPersonFcty($resource, lodash) {

    // public methods
    var factory = {
      resource: resource,
      setRelationOfRelativeToMember: setRelationOfRelativeToMember,
      setRelationOfMemberToRelative: setRelationOfMemberToRelative
    };

    return factory;

    // private functions
    function resource() {
      return $resource('http://localhost:3000/persons/:id', null, {
        update: {method: 'PUT'},
        delete: {method: 'DELETE'}
      });
    }

    // the member is the person the user is editing and the relative is 
    // the person they are adding to the member using the type of relation
    function setRelationOfRelativeToMember(relative, member, relation, includeGender) {

      var memberRelative = { id:member._id, is_blood_related:true };
      var gender_male;

      switch(relation) {
        case '1': // father
          lodash.isArray(relative.children) ? relative.children.push(memberRelative) : [memberRelative];
          gender_male = true;
          break;
        case '2': // mother
          lodash.isArray(relative.children) ? relative.children.push(memberRelative) : [memberRelative];
          gender_male = false;
          break;
        case '3': // brother
          lodash.isArray(relative.siblings) ? relative.siblings.push(memberRelative) : [memberRelative];
          gender_male = true;
          break;
        case '4': // sister
          lodash.isArray(relative.siblings) ? relative.siblings.push(memberRelative) : [memberRelative];
          gender_male = false;
          break;
        case '5': // husband
          memberRelative = { id:member._id, is_blood_related:false };
          lodash.isArray(relative.spouses) ? relative.spouses.push(memberRelative) : [memberRelative];
          gender_male = true;
          break;
        case '6': // wife
          memberRelative = { id:member._id, is_blood_related:false };
          lodash.isArray(relative.spouses) ? relative.spouses.push(memberRelative) : [memberRelative];
          gender_male = false;
          break;
        case '7': // son
          if (member.is_gender_male) {
            lodash.isArray(relative.fathers) ? relative.fathers.push(memberRelative) : [memberRelative];
          } else {
            lodash.isArray(relative.mothers) ? relative.mothers.push(memberRelative) : [memberRelative];
          }
          gender_male = true;
          break;
        case '8': // daughter
          if (member.is_gender_male) {
            lodash.isArray(relative.fathers) ? relative.fathers.push(memberRelative) : [memberRelative];
          } else {
            lodash.isArray(relative.mothers) ? relative.mothers.push(memberRelative) : [memberRelative];
          }
          gender_male = false;
          break;
      }

      if (includeGender) {
        relative.is_gender_male = gender_male;
      }

      return relative;
    }

    // the member is the person the user is editing and the relative is 
    // the person they are adding to the member using the type of relation
    function setRelationOfMemberToRelative(relative, member, relation) {

      var relativeMember = { id:relative._id, is_blood_related:true };

      switch(relation) {
        case '1': // father
          lodash.isArray(member.fathers) ? member.fathers.push(relativeMember) : [relativeMember];
          break;
        case '2': // mother
          lodash.isArray(member.mothers) ? member.mothers.push(relativeMember) : [relativeMember];
          break;
        case '3': // brother
          lodash.isArray(member.siblings) ? member.siblings.push(relativeMember) : [relativeMember];
          break;
        case '4': // sister
          lodash.isArray(member.siblings) ? member.siblings.push(relativeMember) : [relativeMember];
          break;
        case '5': // husband
          relativeMember = { id:relative._id, is_blood_related:false };
          lodash.isArray(member.spouses) ? member.spouses.push(relativeMember) : [relativeMember];
          break;
        case '6': // wife
          relativeMember = { id:relative._id, is_blood_related:false };
          lodash.isArray(member.spouses) ? member.spouses.push(relativeMember) : [relativeMember];
          break;
        case '7': // son
          lodash.isArray(member.children) ? member.children.push(relativeMember) : [relativeMember];
          break;
        case '8': // daughter
          lodash.isArray(member.children) ? member.children.push(relativeMember) : [relativeMember];
          break;
      }

      return relative;
    }

  }

})();

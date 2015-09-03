'use strict';

app.directive('contenteditable', function ($rootScope) {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function (scope, element, attrs, ngModel) {
			if (!ngModel || !$rootScope.isAdmin()) return;
			function read() {
				ngModel.$setViewValue(element.html());
			}
			ngModel.$render = function () {
				element.html(ngModel.$viewValue || '');
			};
			element.bind('blur keyup change', function () {
				scope.$apply(read);
			});
		}
	};
});
angular.module('angularTyped').directive('typed', function() {
    var speed = 250,
        timeOutBeforeNext = 350,
        currentElementIndex = -1;
    return {
        link: function($scope, $element, attrs) {
            var elements = $element.children();

            function showElement(index) {
                elements.addClass('is-hidden');
                var element = angular.element(elements[index]),
                    childrens = element.children();
                element.addClass('is-visible').removeClass('is-hidden');
                angular.forEach(childrens, function(child) {
                    angular.element(child).removeClass('in').addClass('out');
                });
                var childIndex = -1,
                    execution = setInterval(
                        function() {
                            if (childIndex++ < childrens.length) {
                                angular.element(childrens[childIndex]).removeClass('out').addClass('in');
                            } else {
                                clearInterval(execution);
                                setTimeout(function() {
                                    showNext();
                                }, timeOutBeforeNext);

                            }
                        }, speed);
            };

            function showNext() {
                elements.removeClass('is-visible').addClass('is-hidden');
                if (currentElementIndex + 1 < elements.length) {
                    currentElementIndex = currentElementIndex + 1;
                } else {
                    currentElementIndex = 0;
                }
                showElement(currentElementIndex);
            };



            function initDisplay(elements) {
                angular.element($element).after('<span class="typed-cursor">|</span>');
                if (elements.length) {
                    showNext(currentElementIndex);
                }
            };

            function splitByLetter(elements) {
                angular.forEach(elements, function(elem) {
                    elem = angular.element(elem);
                    var letters = elem.text().split(''),
                        isVisible = elem.hasClass('is-visible'),
                        i;
                    for (i in letters) {
                        letters[i] = isVisible ? '<span class="in">' + letters[i] + '</span>' : '<span>' + letters[i] + '</span>';
                    };

                    elem.html(letters.join(''));
                });
            };

            splitByLetter(elements);
            initDisplay(elements);
        }
    };
});

const MyReact = () => {
  let hooks = []; // array to store state values

  let index = 0; // index to track the current hook position

  const useState = (initialValue) => {
    const localHookIndex = index; // store the current index for this hook
    index++; // increment index for the next hook call

    if (hooks[localHookIndex] === undefined) {
      hooks[localHookIndex] = initialValue; // setting initial value for state
    }

    const setterFunction = (newState) => {
      hooks[localHookIndex] = newState; // setting new value for state
    };

    return [hooks[localHookIndex], setterFunction];
  };

  const useEffect = (callback, dependencyArray) => {
    let hasChanged = true;

    const oldDependencies = hooks[index];

    if (oldDependencies) {
      hasChanged = false;

      for (let i = 0; i < dependencyArray.length; i++) {
        const dependency = dependencyArray[i];
        const oldDependency = oldDependencies[i];

        if (!Object.is(dependency, oldDependency)) {
          hasChanged = true;
          break;
        }
      }
    }

    if (hasChanged) {
      callback();
    }

    hooks[index] = dependencyArray;
    index++;
  };

  // render function
  const render = (component) => {
    index = 0; // reset index for re-renders
    return component();
  };

  return {
    useState,
    useEffect,
    render,
  };
};

const { useState, useEffect, render } = MyReact();

const MyComponent = () => {
  const [counter, setCounter] = useState(1);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    console.log("effect");
  }, []);

  console.log(counter);
  console.log(isSubmit);

  if (counter === 1) {
    setCounter(2);
  }

  if (!isSubmit) {
    setIsSubmit(true);
  }
};

render(MyComponent); // Initial render of the component
render(MyComponent); // Simulate component re-rendering

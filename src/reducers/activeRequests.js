export default function activeRequests(state = [], action) {
  const newState = state.slice();

  // regex that tests for an API action string ending with _PENDING
  const reqReg = new RegExp(/_PENDING$/g);
  // regex that tests for a API action string ending with _FULFILLED
  const sucReg = new RegExp(/_FULFILLED$/g);
  // regex that tests for a API action string ending with _FAILED
  const failReg = new RegExp(/_FAILED$/g);

  // if a _PENDING comes in, add it to the activeRequests list
  if (reqReg.test(action.type)) {
    newState.push(action.type);
  }

  // if a _FULFILLED comes in, delete its corresponding _PENDING
  if (sucReg.test(action.type)) {
    const split = action.type.split(`_`)
    split[split.length - 1] = `PENDING`
    const reqType = split.join(`_`)
    const deleteInd = state.indexOf(reqType);

    if (deleteInd !== -1) {
      newState.splice(deleteInd, 1);
    }
  }

  // if a _FAILED comes in, delete its corresponding _PENDING
  if (failReg.test(action.type)) {
    const split = action.type.split(`_`)
    split[split.length - 1] = `PENDING`
    const reqType = split.join(`_`)
    const deleteInd = state.indexOf(reqType);

    if (deleteInd !== -1) {
      newState.splice(deleteInd, 1);
    }
  }

  return newState;
}

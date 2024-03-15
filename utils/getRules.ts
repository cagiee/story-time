import * as yup from 'yup'

export default (inputType: string, label: string, rules: any) => {
  let tempRules = null

  if (inputType == 'number') {
    tempRules = yup.number()
  } else if (inputType == 'email' && rules?.isEmail){
    tempRules = yup.string().email(`The ${label} field must be a valid email`)
  } else {
    tempRules = yup.string()
    if (rules?.mustMatchWith) {
      tempRules = tempRules.oneOf([rules?.mustMatchWith, null], `The ${label} field does not match`)
    }
  }

  if (rules?.required)
    tempRules = tempRules.required(`${label} is a required field`)
  if (rules?.min)
    tempRules = tempRules.min(rules?.min, `${label} must be at least ${rules?.min} characters`)

  return tempRules
}

/* Controllers */
import * as Employer from 'controllers/Employer'

/* Validator */
import * as Validator from 'middlewares/validators/employers'

import { Router } from "express"

const { employerValidationRules, validate } = Validator

export default (router: Router) => {

    /* EMPLOYERS ROUTE */
    router.post('/employers/create', employerValidationRules(), validate, Employer.createEmployer)
    router.get('/employers', Employer.getAllEmployers)
    router.get('/employers/:id', Employer.getAllEmployer)
}



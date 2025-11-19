// Step 1: Define the validation logic
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsSpecificDomainEmail', async: false })
class IsSpecificDomainEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    if (typeof email !== 'string') return false;

    const [_, domain] = email.split('@');
    const allowedDomain = args.constraints[0]; // Get the allowed domain
    return domain === allowedDomain;
  }

  defaultMessage(args: ValidationArguments) {
    const allowedDomain = args.constraints[0];
    return `Email must be from the domain '${allowedDomain}'`;
  }
}

// Step 2: Create a decorator to use this logic
export function IsSpecificDomainEmail(
  domain: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [domain],
      validator: IsSpecificDomainEmailConstraint,
    });
  };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_route53_1 = require("aws-cdk-lib/aws-route53");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const integ_tests_alpha_1 = require("@aws-cdk/integ-tests-alpha");
const aws_certificatemanager_1 = require("aws-cdk-lib/aws-certificatemanager");
/**
 * In order to test this you need to have a valid public hosted zone that you can use
 * to request certificates for.
 *
*/
const hostedZoneId = process.env.CDK_INTEG_HOSTED_ZONE_ID ?? process.env.HOSTED_ZONE_ID;
if (!hostedZoneId)
    throw new Error('For this test you must provide your own HostedZoneId as an env var "HOSTED_ZONE_ID"');
const hostedZoneName = process.env.CDK_INTEG_HOSTED_ZONE_NAME ?? process.env.HOSTED_ZONE_NAME;
if (!hostedZoneName)
    throw new Error('For this test you must provide your own HostedZoneName as an env var "HOSTED_ZONE_NAME"');
const domainName = process.env.CDK_INTEG_DOMAIN_NAME ?? process.env.DOMAIN_NAME;
if (!domainName)
    throw new Error('For this test you must provide your own Domain Name as an env var "DOMAIN_NAME"');
const app = new aws_cdk_lib_1.App();
const stack = new aws_cdk_lib_1.Stack(app, 'integ-certificate-name');
const hostedZone = aws_route53_1.PublicHostedZone.fromHostedZoneAttributes(stack, 'HostedZone', {
    hostedZoneId,
    zoneName: hostedZoneName,
});
new aws_certificatemanager_1.Certificate(stack, 'Certificate', {
    domainName,
    certificateName: 'This is a test name',
    validation: aws_certificatemanager_1.CertificateValidation.fromDns(hostedZone),
});
new integ_tests_alpha_1.IntegTest(app, 'integ-test', {
    testCases: [stack],
    diffAssets: true,
    enableLookups: true,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuY2VydGlmaWNhdGUtbmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVnLmNlcnRpZmljYXRlLW5hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBMkQ7QUFDM0QsNkNBQXlDO0FBQ3pDLGtFQUF1RDtBQUN2RCwrRUFBd0Y7QUFFeEY7Ozs7RUFJRTtBQUNGLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFDeEYsSUFBSSxDQUFDLFlBQVk7SUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHFGQUFxRixDQUFDLENBQUM7QUFDMUgsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBQzlGLElBQUksQ0FBQyxjQUFjO0lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5RkFBeUYsQ0FBQyxDQUFDO0FBQ2hJLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFDaEYsSUFBSSxDQUFDLFVBQVU7SUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlGQUFpRixDQUFDLENBQUM7QUFFcEgsTUFBTSxHQUFHLEdBQUcsSUFBSSxpQkFBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxtQkFBSyxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sVUFBVSxHQUFHLDhCQUFnQixDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUU7SUFDaEYsWUFBWTtJQUNaLFFBQVEsRUFBRSxjQUFjO0NBQ3pCLENBQUMsQ0FBQztBQUVILElBQUksb0NBQVcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFO0lBQ3BDLFVBQVU7SUFDVixlQUFlLEVBQUUscUJBQXFCO0lBQ3RDLFVBQVUsRUFBRSw4Q0FBcUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO0NBQ3RELENBQUMsQ0FBQztBQUVILElBQUksNkJBQVMsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFO0lBQy9CLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUNsQixVQUFVLEVBQUUsSUFBSTtJQUNoQixhQUFhLEVBQUUsSUFBSTtDQUNwQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQdWJsaWNIb3N0ZWRab25lIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXJvdXRlNTMnO1xuaW1wb3J0IHsgQXBwLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IEludGVnVGVzdCB9IGZyb20gJ0Bhd3MtY2RrL2ludGVnLXRlc3RzLWFscGhhJztcbmltcG9ydCB7IENlcnRpZmljYXRlLCBDZXJ0aWZpY2F0ZVZhbGlkYXRpb24gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2VydGlmaWNhdGVtYW5hZ2VyJztcblxuLyoqXG4gKiBJbiBvcmRlciB0byB0ZXN0IHRoaXMgeW91IG5lZWQgdG8gaGF2ZSBhIHZhbGlkIHB1YmxpYyBob3N0ZWQgem9uZSB0aGF0IHlvdSBjYW4gdXNlXG4gKiB0byByZXF1ZXN0IGNlcnRpZmljYXRlcyBmb3IuXG4gKlxuKi9cbmNvbnN0IGhvc3RlZFpvbmVJZCA9IHByb2Nlc3MuZW52LkNES19JTlRFR19IT1NURURfWk9ORV9JRCA/PyBwcm9jZXNzLmVudi5IT1NURURfWk9ORV9JRDtcbmlmICghaG9zdGVkWm9uZUlkKSB0aHJvdyBuZXcgRXJyb3IoJ0ZvciB0aGlzIHRlc3QgeW91IG11c3QgcHJvdmlkZSB5b3VyIG93biBIb3N0ZWRab25lSWQgYXMgYW4gZW52IHZhciBcIkhPU1RFRF9aT05FX0lEXCInKTtcbmNvbnN0IGhvc3RlZFpvbmVOYW1lID0gcHJvY2Vzcy5lbnYuQ0RLX0lOVEVHX0hPU1RFRF9aT05FX05BTUUgPz8gcHJvY2Vzcy5lbnYuSE9TVEVEX1pPTkVfTkFNRTtcbmlmICghaG9zdGVkWm9uZU5hbWUpIHRocm93IG5ldyBFcnJvcignRm9yIHRoaXMgdGVzdCB5b3UgbXVzdCBwcm92aWRlIHlvdXIgb3duIEhvc3RlZFpvbmVOYW1lIGFzIGFuIGVudiB2YXIgXCJIT1NURURfWk9ORV9OQU1FXCInKTtcbmNvbnN0IGRvbWFpbk5hbWUgPSBwcm9jZXNzLmVudi5DREtfSU5URUdfRE9NQUlOX05BTUUgPz8gcHJvY2Vzcy5lbnYuRE9NQUlOX05BTUU7XG5pZiAoIWRvbWFpbk5hbWUpIHRocm93IG5ldyBFcnJvcignRm9yIHRoaXMgdGVzdCB5b3UgbXVzdCBwcm92aWRlIHlvdXIgb3duIERvbWFpbiBOYW1lIGFzIGFuIGVudiB2YXIgXCJET01BSU5fTkFNRVwiJyk7XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmNvbnN0IHN0YWNrID0gbmV3IFN0YWNrKGFwcCwgJ2ludGVnLWNlcnRpZmljYXRlLW5hbWUnKTtcbmNvbnN0IGhvc3RlZFpvbmUgPSBQdWJsaWNIb3N0ZWRab25lLmZyb21Ib3N0ZWRab25lQXR0cmlidXRlcyhzdGFjaywgJ0hvc3RlZFpvbmUnLCB7XG4gIGhvc3RlZFpvbmVJZCxcbiAgem9uZU5hbWU6IGhvc3RlZFpvbmVOYW1lLFxufSk7XG5cbm5ldyBDZXJ0aWZpY2F0ZShzdGFjaywgJ0NlcnRpZmljYXRlJywge1xuICBkb21haW5OYW1lLFxuICBjZXJ0aWZpY2F0ZU5hbWU6ICdUaGlzIGlzIGEgdGVzdCBuYW1lJyxcbiAgdmFsaWRhdGlvbjogQ2VydGlmaWNhdGVWYWxpZGF0aW9uLmZyb21EbnMoaG9zdGVkWm9uZSksXG59KTtcblxubmV3IEludGVnVGVzdChhcHAsICdpbnRlZy10ZXN0Jywge1xuICB0ZXN0Q2FzZXM6IFtzdGFja10sXG4gIGRpZmZBc3NldHM6IHRydWUsXG4gIGVuYWJsZUxvb2t1cHM6IHRydWUsXG59KTtcbiJdfQ==
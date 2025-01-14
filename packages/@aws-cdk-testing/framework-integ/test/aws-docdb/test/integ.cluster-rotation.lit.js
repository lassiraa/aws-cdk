"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ec2 = require("aws-cdk-lib/aws-ec2");
const cdk = require("aws-cdk-lib");
const docdb = require("aws-cdk-lib/aws-docdb");
/*
 * Stack verification steps:
 * * aws secretsmanager describe-secret --secret-id <deployed secret arn>
 * * aws lambda get-function --function-name <lambda arn from "RotationLambdaARN" in previous output
 *   * verify the lambda has the tag "serverlessrepo:applicationId" with the value
 *     "arn:aws:serverlessrepo:us-east-1:297356227824:applications/SecretsManagerMongoDBRotationSingleUser"
 */
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-docdb-cluster-rotation');
const vpc = new ec2.Vpc(stack, 'VPC');
/// !show
const cluster = new docdb.DatabaseCluster(stack, 'Database', {
    masterUser: {
        username: 'docdb',
    },
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.R5, ec2.InstanceSize.LARGE),
    vpc,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
});
cluster.addRotationSingleUser();
/// !hide
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuY2x1c3Rlci1yb3RhdGlvbi5saXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlZy5jbHVzdGVyLXJvdGF0aW9uLmxpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUEyQztBQUMzQyxtQ0FBbUM7QUFDbkMsK0NBQStDO0FBRS9DOzs7Ozs7R0FNRztBQUVILE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztBQUVuRSxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRXRDLFNBQVM7QUFDVCxNQUFNLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRTtJQUMzRCxVQUFVLEVBQUU7UUFDVixRQUFRLEVBQUUsT0FBTztLQUNsQjtJQUNELFlBQVksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUMvRSxHQUFHO0lBQ0gsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztDQUN6QyxDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUNoQyxTQUFTO0FBRVQsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZWMyIGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGRvY2RiIGZyb20gJ2F3cy1jZGstbGliL2F3cy1kb2NkYic7XG5cbi8qXG4gKiBTdGFjayB2ZXJpZmljYXRpb24gc3RlcHM6XG4gKiAqIGF3cyBzZWNyZXRzbWFuYWdlciBkZXNjcmliZS1zZWNyZXQgLS1zZWNyZXQtaWQgPGRlcGxveWVkIHNlY3JldCBhcm4+XG4gKiAqIGF3cyBsYW1iZGEgZ2V0LWZ1bmN0aW9uIC0tZnVuY3Rpb24tbmFtZSA8bGFtYmRhIGFybiBmcm9tIFwiUm90YXRpb25MYW1iZGFBUk5cIiBpbiBwcmV2aW91cyBvdXRwdXRcbiAqICAgKiB2ZXJpZnkgdGhlIGxhbWJkYSBoYXMgdGhlIHRhZyBcInNlcnZlcmxlc3NyZXBvOmFwcGxpY2F0aW9uSWRcIiB3aXRoIHRoZSB2YWx1ZVxuICogICAgIFwiYXJuOmF3czpzZXJ2ZXJsZXNzcmVwbzp1cy1lYXN0LTE6Mjk3MzU2MjI3ODI0OmFwcGxpY2F0aW9ucy9TZWNyZXRzTWFuYWdlck1vbmdvREJSb3RhdGlvblNpbmdsZVVzZXJcIlxuICovXG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5jb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soYXBwLCAnYXdzLWNkay1kb2NkYi1jbHVzdGVyLXJvdGF0aW9uJyk7XG5cbmNvbnN0IHZwYyA9IG5ldyBlYzIuVnBjKHN0YWNrLCAnVlBDJyk7XG5cbi8vLyAhc2hvd1xuY29uc3QgY2x1c3RlciA9IG5ldyBkb2NkYi5EYXRhYmFzZUNsdXN0ZXIoc3RhY2ssICdEYXRhYmFzZScsIHtcbiAgbWFzdGVyVXNlcjoge1xuICAgIHVzZXJuYW1lOiAnZG9jZGInLFxuICB9LFxuICBpbnN0YW5jZVR5cGU6IGVjMi5JbnN0YW5jZVR5cGUub2YoZWMyLkluc3RhbmNlQ2xhc3MuUjUsIGVjMi5JbnN0YW5jZVNpemUuTEFSR0UpLFxuICB2cGMsXG4gIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG59KTtcblxuY2x1c3Rlci5hZGRSb3RhdGlvblNpbmdsZVVzZXIoKTtcbi8vLyAhaGlkZVxuXG5hcHAuc3ludGgoKTtcbiJdfQ==
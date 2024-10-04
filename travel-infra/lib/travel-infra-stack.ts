import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs" // This should come from the 'constructs' package
import * as s3 from "aws-cdk-lib/aws-s3"

export class TravelInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const appBucket = new s3.Bucket(this, "place_images", {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
    })

    // TODO: Implement to where only the IAM role of the app can access the bucket
    // const appBucket = new s3.Bucket(this, "place_images", {
    //   versioned: true,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    // })

    // // Define a bucket policy granting public read access
    // appBucket.addToResourcePolicy(
    //   new iam.PolicyStatement({
    //     actions: ["s3:GetObject"],
    //     resources: [`${appBucket.bucketArn}/*`], // Applies to all objects in the bucket
    //     principals: [new iam.AnyPrincipal()], // Public access (anyone)
    //   })
    // )

    new cdk.CfnOutput(this, "S3BucketName", {
      value: appBucket.bucketName,
    })
  }
}

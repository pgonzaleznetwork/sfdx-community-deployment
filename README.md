# SFDX Community Deployment

This sample sfdx project contains the metadata needed to deploy an experience/community site. 

As seen on https://www.pablogonzalez.io/how-to-deploy-a-community-experience-site-with-sfdx-and-not-go-crazy/

## Contents

* [Community Metadata](#community-metadata)
* [Dependencies](#dependencies)
    * [Visualforce Pages](#visualforce-pages)
    * [Static Resources](#static-resources)
    * [Email Templates](#email-templates)
    * [Profiles and Permission Sets](#profiles-and-permission-sets)
    * [LWC](#lwc)
    * [Flows](#flows)
    * [Custom Fields](#custom-fields)
* [Other Objects](#other-objects)
    * [Audiences](#audiences)   
    * [Topics](#topics)
    * [Sharing Sets](#sharing-sets)
* [package.xml](#packagexml)
* [How to deploy this community](#how-to-deploy-this-community)


### Community Metadata

The community is represented by 3 main metadata types: [Network](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_network.htm?q=network), [CustomSite](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_sites.htm) and [ExperienceBundle](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_experiencebundle.htm)

Note how the name of the site (**Salto Support** in this example) is written differently for all the 3 metadata types (to make things more confusing)

```xml
    <types>
        <members>Salto Support</members>
        <name>Network</name>
    </types>
    <types>
        <members>Salto_Support</members>
        <name>CustomSite</name>
    </types>
    <types>
        <members>Salto_Support1</members>
        <name>ExperienceBundle</name>
    </types>
```

### Dependencies

#### Visualforce Pages

The XML for the Site object, contains references to Visualforce pages, for example

```xml
<fileNotFoundPage>FileNotFound</fileNotFoundPage>
<forgotPasswordPage>ForgotPassword</forgotPasswordPage>
<genericErrorPage>Exception</genericErrorPage>
<inMaintenancePage>InMaintenance</inMaintenancePage>
<indexPage>CommunitiesLanding</indexPage>
```

These pages exist by default in an org with communities enabled. But if you've made changes to these, you have to include them in your sfdx project. 

#### Static Resources

Also, the `serverIsDown` property points to a `StaticResource`

```xml
<serverIsDown>sonar__fieldSpyHowToUseImages</serverIsDown>
```

#### Email Templates

The XML file for the `Network` metadata type contains references to email templates, for example:

```xml
<caseCommentEmailTemplate>unfiled$public/CommunityChangePasswordEmailTemplate</caseCommentEmailTemplate>
<changePasswordTemplate>unfiled$public/CommunityChangePasswordEmailTemplate</changePasswordTemplate>
<chgEmailVerNewTemplate>unfiled$public/ExperienceCloudSelfRegMicroBatchSubErrorEmailTemplate</chgEmailVerNewTemplate>
<chgEmailVerOldTemplate>unfiled$public/CommunityChgEmailVerOldTemplate</chgEmailVerOldTemplate>
```

Like with visualforce pages, all of these should exist in an org with communities enabled. But if you've made changes to them or you specified your own email templates, they must be included in your sfdx project.

#### Profiles and Permission Sets

The XML file for the `Network` metadata type contains references to profiles and permission sets, for example:

```xml
<networkMemberGroups>
    <permissionSet>Omni_Setup_Flow</permissionSet>
    <permissionSet>Knowledge_Manager_156158</permissionSet>
    <permissionSet>GIFter</permissionSet>
    <profile>admin</profile>
    <profile>knowledge manager</profile>
    <profile>identity user</profile>
    <profile>contractmanager</profile>
</networkMemberGroups>
```

These must be included in your sfdx project. 

```xml
<types>
    <members>Omni_Setup_Flow</members>
        <members>Knowledge_Manager_156158</members>
        <members>GIFter</members>
    <name>PermissionSet</name>
</types>
```

#### LWC

LWCs can be used directly in the community pages, which are represented by the `experiencies/Salto_Support1/views/view_name` file, for example:

```json
{
    "componentAttributes" : {
    "buttonText" : "Salto rocks!"
    },
    "componentName" : "c:customCommunityComponent",
    "id" : "806050a5-50f4-4a1f-87c2-84ec227c75c5",
    "renderPriority" : "NEUTRAL",
    "renditionMap" : { },
    "type" : "component"
} 
```

In the json above, `customCommunityComponent` represents the name of an LWC. These must be included in your sfdx project. 

```xml
<types>
    <members>customCommunityComponent</members>
    <name>LightningComponentBundle</name>
</types>
```

#### Flows

Flows can be used directly in the community pages, which are represented by the `experiencies/Salto_Support1/views/view_name` file, for example:

```json
"components" : [ {
    "componentAttributes" : {
    "flowArguments" : "",
    "flowName" : "Create_a_Case_Custom"
    },
    "componentName" : "forceCommunity:flowCommunity",
    "id" : "38c2ea98-6a47-4e38-ae88-6c309578f57d",
    "renderPriority" : "NEUTRAL",
    "renditionMap" : { },
    "type" : "component"
}
```

In the above json, `Create_a_Case_Custom` is the name of a flow. This must be included in your sfdx project.

```
<types>
    <members>Create_a_Case_Custom</members>
    <name>Flow</name>
</types>
```

#### Custom fields

Custom fields can be referenced by the Flows or LWCs that you included. However, they can also be referenced on the site itself via the `Audience` metadata type.

Here's an example of a filter criteria for an `Audience` associated to my site

```xml
<criteria>
    <criterion>
        <criteriaNumber>1</criteriaNumber>
        <criterionValue>
            <entityField>Contact.Account.$Account.CustomerPriority__c</entityField>
            <entityType>User</entityType>
            <fieldValue>New High</fieldValue>
        </criterionValue>
        <operator>Equal</operator>
        <type>FieldBased</type>
    </criterion>
</criteria>
```

Here, the `Account.CustomerPriority` field must be included in your sfdx project

```xml
<types>
    <members>Account.CustomerPriority__c</members>
    <name>CustomField</name>
</types>
```

### Other objects

There are other objects that are linked to your community site.

#### Community Navigation Menu

This represents the navigation menu in an Experience Builder site. A navigation menu consists of items that users can click to go to other parts of the site.

These can be included via `package.xml`

```xml
<types>
    <members>SFDC_Default_Navigation_Salto Support</members>
    <name>NavigationMenu</name>
</types> 
```

#### Audiences

Audiences can be used to limit certain community components to specific users. These can be included via `package.xml`

```xml
<types>
    <members>VIP_Customers</members>
    <members>Default_Salto Support</members>
    <name>Audience</name>
</types>
```

#### Topics

Topics are used to tag content, chatter feeds, etc. They can also be used for navigation. These can be included via `package.xml`

```xml
<types>
    <members>Salto Support</members>
    <name>ManagedTopics</name>
</types>
```

#### Sharing Sets

Sharing Sets are used to share records with customer community users who don't have access to standard sharing rules. These can be included via `package.xml`


Note that the `accessMapping` contains references to custom fields. You must include those in your sfdx project

```xml
 <accessMappings>
    <accessLevel>Read</accessLevel>
    <object>Case</object>
    <objectField>Original_Deal__c.Account</objectField>
    <userField>Contact.OtherAccountId__c</userField>
</accessMappings>
```

These fields must also be included in your sfdx project

```xml
 <types>
    <members>Account.CustomerPriority__c</members>
    <members>Case.Original_Deal__c</members>
    <members>Contact.OtherAccountId__c</members>
    <name>CustomField</name>
</types>
```

### package.xml

The `package.xml` file in this directory contains all the metadata mentioned above, which is required to completely deploy this community site to another org. 

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <types>
        <members>Salto Support</members>
        <name>Network</name>
    </types>
    <types>
        <members>Salto_Support</members>
        <name>CustomSite</name>
    </types>
    <types>
        <members>Salto_Support1</members>
        <name>ExperienceBundle</name>
    </types>
     <types>
        <members>CommunitiesLogin</members>
        <members>BandwidthExceeded</members>
        <members>FileNotFound</members>
        <members>ForgotPassword</members>
        <members>Exception</members>
        <members>InMaintenance</members>
        <members>CommunitiesLanding</members>
        <members>CommunitiesSelfReg</members>
        <name>ApexPage</name>
    </types>
    <types>
        <members>sonar__fieldSpyHowToUseImages</members>
        <name>StaticResource</name>
    </types>
     <types>
        <members>Omni_Setup_Flow</members>
         <members>Knowledge_Manager_156158</members>
          <members>GIFter</members>
        <name>PermissionSet</name>
    </types>
    <types>
        <members>customCommunityComponent</members>
        <name>LightningComponentBundle</name>
    </types>
    <types>
        <members>Create_a_Case_Custom</members>
        <name>Flow</name>
    </types>
    <types>
        <members>Salto Support</members>
        <name>ManagedTopics</name>
    </types>
    <types>
        <members>VIP_Customers</members>
        <members>Default_Salto Support</members>
        <name>Audience</name>
    </types>
    <types>
        <members>Account.CustomerPriority__c</members>
        <members>Case.Original_Deal__c</members>
        <members>Contact.OtherAccountId__c</members>
        <name>CustomField</name>
    </types>
    <types>
        <members>Share_cases_with_users</members>
        <name>SharingSet</name>
    </types>
    <version>55.0</version>
</Package>
```

### How to deploy this community

Create a scratch org with communities enabled. I used Org Shape (from the source org) to ensure all community settings were present.

```json
{
  "orgName": "Acme",
  "sourceOrg": "00D3h000005XLUw", 
  "features": ["Communities", "ServiceCloud"],
  "settings": {
      "communitiesSettings": {
          "enableNetworksEnabled": true
      },
      "experienceBundleSettings": {
        "enableExperienceBundleMetadata": true
    }
  }
}
```

Then run this command to create the scratch org:

```
sfdx force:org:create -f config/project-scratch-def.json --setalias communityorg --durationdays 7 --setdefaultusername --json --loglevel fatal
```

When the command is done, you should get something like this

```json
{
  "status": 0,
  "result": {
    "username": "test-byzwi5tgqctv@example.com",
    "scratchOrgInfo": {
      "attributes": {
        "type": "ScratchOrgInfo",
        "url": "/services/data/v56.0/sobjects/ScratchOrgInfo/2SR3h000000LmzeGAC"
      },
      "Id": "2SR3h000000LmzeGAC",
      "OwnerId": "0053h000002JF4cAAG",
      "IsDeleted": false,
      "Name": "00000004",
      "CreatedDate": "2022-12-20T13:58:59.000+0000",
      "CreatedById": "0053h000002JF4cAAG",
       ...
    "orgId": "00D8F0000004gGjUAI"
  }
}
```

Log in to the scratch org. Make sure `Enable ExperienceBundle Metadata API` is enabled under `Setup > Experiencies > Settings` (it should be enabled if you used the org shape from the source org)

Then, just push the entire source to the scratch org

```
sfdx force:source:push
```

Once it's done, you should have a community site named Salto Support, along with all its dependencies. 


# SFDX Community Deployment

This sample sfdx project contains the metadata needed to deploy an experience/community site. The 3 main metadata types are [Network](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_network.htm?q=network), [CustomSite](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_sites.htm) and [ExperienceBundle](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_experiencebundle.htm)

### package.xml

Note that the package.xml file contains the 3 metadata types mentioned above. Note how the name of the site (Salto Support) is written differently for all the 3 metadata types (to make things more confusing)

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

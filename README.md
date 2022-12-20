# SFDX Community Deployment

This sample sfdx project contains the metadata needed to deploy an experience/community site. The 3 main metadata types are [Network](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_network.htm?q=network), [CustomSite](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_sites.htm) and [ExperienceBundle](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_experiencebundle.htm)

## package.xml

Note that the package.xml file contains the 3 metadata types mentioned above. Note how the name of the site (Salto Support) is written differently for all the 3 metadata types (to make things more confusing)

```
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

The XML for the Site object, contains references to Visualforce pages, for example

```
<fileNotFoundPage>FileNotFound</fileNotFoundPage>
<forgotPasswordPage>ForgotPassword</forgotPasswordPage>
<genericErrorPage>Exception</genericErrorPage>
<inMaintenancePage>InMaintenance</inMaintenancePage>
<indexPage>CommunitiesLanding</indexPage>
```

These pages exist by default in an org with communities enabled. But if you've made changes to these, you have to include them in your sfdx project. 
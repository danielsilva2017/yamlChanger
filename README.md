# yamlChanger

This repository allows the user to change the Kubernetes deployment files and get information about your  orchestration.


## Structure

var client = new Client({
	protocol: 'http',
	host: '127.0.0.1:8001',
	version: 'apps/v1',
	reqOptions: {},
	namespace: 'default'
});

Depending if you are working with deployment, pods or service the version can change and you might have to edit it ( check api/routes/).
The host will be 127.0.0.1:8001 if you are working with minikube localhost ( to active that port you have to run **kubectl proxy** or **kubectl proxy &**


## Endpoints to change deployment

- Change the number of replicas : **deployment** -> name of the deployment, **replicas** -> number of replicas
> /replicas/{deployment}/{id}
- Change the limit available for that deployment in terms of cpu: **deployment** -> name of the deployment, **id** -> number of resources
>/resources/limits/cpu/{deployment}/{id}
- Change the limit available for that deployment in terms of memory: **deployment** -> name of the deployment, **id** -> number of resources
>/resources/limits/memory/{deployment}/{id}
- Change the request size for that deployment in terms of cpu: **deployment** -> name of the deployment, **id** -> number of resources
>/resources/requests/cpu/{deployment}/{id}
- Change the limit available for that deployment in terms of memory: **deployment** -> name of the deployment, **id** -> number of resources
>/resources/requests/memory/{deployment}/{id}

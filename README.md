# yamlChanger

This repository allows the user to change the Kubernetes deployment files and get information about your  orchestration.

## Note

At the moment this repository still contains both solutions: before queue and the queue solution. The repository will suffer some cleaning soon

<!--- # Structure

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

- To Change the number of replicas : **deployment** -> name of the deployment, **replicas** -> number of replicas
> /replicas/{deployment}/{id}
- To Change the limit available for that deployment in terms of cpu: **deployment** -> name of the deployment, **id** -> number of resources : p.e. 0.5 is guaranteed half as much CPU as one that asks for 1 CPU. The expression 0.1 is equivalent to the expression 100m, which can be read as “one hundred millicpu
>/resources/limits/cpu/{deployment}/{id}
- To Change the limit available for that deployment in terms of memory: **deployment** -> name of the deployment, **id** -> number of resources measured p.e in Mi : Each Container has a limit of 0.5 cpu and 128MiB of memory. You can say the Pod has a request of 0.5 cpu and 128 MiB of memory, and a limit of 1 cpu and 256MiB of memory
>/resources/limits/memory/{deployment}/{id}
- To Change the request size for that deployment in terms of cpu: **deployment** -> name of the deployment, **id** -> number of resources: : p.e. 0.5 is guaranteed half as much CPU as one that asks for 1 CPU. The expression 0.1 is equivalent to the expression 100m, which can be read as “one hundred millicpu
>/resources/requests/cpu/{deployment}/{id}
- To Change the limit available for that deployment in terms of memory: **deployment** -> name of the deployment, **id** -> number of resources measured p.e in Mi : Each Container has a limit of 0.5 cpu and 128MiB of memory. You can say the Pod has a request of 0.5 cpu and 128 MiB of memory, and a limit of 1 cpu and 256MiB of memory
>/resources/requests/memory/{deployment}/{id} -->



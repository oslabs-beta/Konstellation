import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

class ClusterModel {
  public static async getCluster(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const elements = [];
    const clusterName = 'Control Plane'; //await getClusterName()

    elements.push({
      data: { id: clusterName, label: clusterName, type: 'root' },
    });

    const namespaceData = await k8sApi.listNamespace();
    const namespaces: string[] = [];

    namespaceData.body.items.forEach((space: any) => {
      const name = space.metadata.name;
      if (name !== 'kube-system') namespaces.push(name);
      elements.push({
        data: {
          id: name,
          label: name,
          type: 'namespace',
        },
      });
      elements.push({
        data: {
          source: clusterName,
          target: name,
          id: uuidv4(),
        },
      });
    });
    for (const namespace of namespaces) {
      const podData = await k8sApi.listNamespacedPod(namespace);
      podData.body.items.forEach((pod: any) => {
        const name = pod.metadata.name;
        elements.push({
          data: {
            id: name,
            label: name,
            type: 'pod',
          },
        });
        elements.push({
          data: {
            source: namespace,
            target: name,
            id: uuidv4(),
          },
        });
      });
    }

    res.locals.elements = elements;
    //console.log(elements)
    return next();
  }
}

export default ClusterModel;

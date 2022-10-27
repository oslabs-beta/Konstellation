import React, { useState, useEffect } from 'react';

import ClusterVisualizer from './ClusterVisualizer'
import TraceVisualizer from './TraceVisualizer'

enum VisualizerType{cluster, trace}

const VisualizerTab = () => {
 
  const [type, setType] = useState<VisualizerType>(VisualizerType.cluster)


// ClusterVisualizer
// TraceVisualizer

  if (type === VisualizerType.cluster) {
    return (
      <ClusterVisualizer />
    );
  }
  else if (type === VisualizerType.trace) {
    return (
    <TraceVisualizer />
    );
  }
  return null
};

export default VisualizerTab;

// Auto-generated component from DropUI
// Generated: 2026-05-18T04:11:33.270Z

import React from 'react';
import { Button, Container } from 'DropUi';

const componentRegistry = {
  Button,
  button: Button,
  Container,
  container: Container,
};

const CSS_STYLE_KEYS = new Set([
  'color',
  'backgroundColor',
  'fontSize',
  'textAlign',
  'fontWeight',
  'padding',
  'margin',
  'width',
  'height',
  'display',
  'border',
  'borderRadius',
  'boxShadow',
]);

const Renderer = ({ node }) => {
  if (!node) return null;

  const Comp = componentRegistry[node.type] || 'div';

  // Separate CSS props from DOM props
  const cssProps = {};
  const domProps = {};
  
  Object.entries(node.props || {}).forEach(([key, value]) => {
    if (CSS_STYLE_KEYS.has(key)) {
      cssProps[key] = value;
    } else {
      domProps[key] = value;
    }
  });

  const style = Object.keys(cssProps).length > 0 ? cssProps : undefined;

  return (
    <Comp 
      {...domProps} 
      style={style}
      className={node.props?.className || ''}
    >
      {node.children?.map((child) => (
        <Renderer key={child.id} node={child} />
      ))}
    </Comp>
  );
};

const GeneratedUI = () => {
  const design = {"id":"root","type":"div","props":{"className":"p-4 min-h-screen"},"children":[{"id":"1779077286371","type":"faram","children":[{"id":"1779077289986","type":"nvbar","children":[]}]}]};
  const nodes = Array.isArray(design) ? design : design?.children || [];

  return (
    <div className="generated-ui">
      {nodes.map((node) => (
        <Renderer key={node.id} node={node} />
      ))}
    </div>
  );
};

export default GeneratedUI;

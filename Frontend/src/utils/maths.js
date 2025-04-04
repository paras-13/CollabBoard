import React from "react";
import { TOOL_ITEMS, ELEMENT_ERASE_THRESHOLD } from "./constants";

export const getArrowHeadCoordinates = (x1, y1, x2, y2, arrowLength) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const x3 = x2 - arrowLength * Math.cos(angle - Math.PI / 6);
  const y3 = y2 - arrowLength * Math.sin(angle - Math.PI / 6);

  const x4 = x2 - arrowLength * Math.cos(angle + Math.PI / 6);
  const y4 = y2 - arrowLength * Math.sin(angle + Math.PI / 6);
  return {
    x3,
    y3,
    x4,
    y4,
  };
};

export const isPointNearElement = (element, pointX, pointY) => {
  const { x1, y1, x2, y2, type } = element;
  const context = document.getElementById("canvas").getContext("2d");
  switch (type) {
    case TOOL_ITEMS.LINE:
    case TOOL_ITEMS.ARROW:
      return isPointCloseToLine(x1, y1, x2, y2, pointX, pointY);
    case TOOL_ITEMS.RECTANGLE:
      return (
        isPointCloseToLine(x1, y1, x2, y1, pointX, pointY) ||
        isPointCloseToLine(x2, y1, x2, y2, pointX, pointY) ||
        isPointCloseToLine(x2, y2, x1, y2, pointX, pointY) ||
        isPointCloseToLine(x1, y2, x1, y1, pointX, pointY)
      );
    case TOOL_ITEMS.CIRCLE: {
      return (
        isPointCloseToLine(x1, y1, x2, y1, pointX, pointY) ||
        isPointCloseToLine(x2, y1, x2, y2, pointX, pointY) ||
        isPointCloseToLine(x2, y2, x1, y2, pointX, pointY) ||
        isPointCloseToLine(x1, y2, x1, y1, pointX, pointY)
      );
    }
    case TOOL_ITEMS.BRUSH: {
      const { path } = element;
      return context.isPointInPath(path, pointX, pointY);
    }

    case TOOL_ITEMS.TEXT: {
      context.font = `${element.size}px Merienda`;
      context.fillStyle = element.stroke;
      const textWidth = context.measureText(element.size).width;
      const textHeight = parseInt(element.size);
      context.restore();
      return (
        isPointCloseToLine(x1, y1, x1 + textWidth, y1, pointX, pointY) ||
        isPointCloseToLine(
          x1 + textWidth,
          y1,
          x1 + textWidth,
          y1 + textHeight,
          pointX,
          pointY
        ) ||
        isPointCloseToLine(
          x1 + textWidth,
          y1 + textHeight,
          x1,
          y1 + textHeight,
          pointX,
          pointY
        ) ||
        isPointCloseToLine(x1, y1 + textHeight, x1, y1, pointX, pointY)
      );
    }
    default:
      throw new Error("Type not recognized");
  }
};

const isPointCloseToLine = (x1, y1, x2, y2, pointX, pointY) => {
  const distToStart = distanceBetweenPoints(x1, y1, pointX, pointY);
  const distToEnd = distanceBetweenPoints(x2, y2, pointX, pointY);
  const distLine = distanceBetweenPoints(x1, y1, x2, y2);
  return Math.abs(distToStart + distToEnd - distLine) < ELEMENT_ERASE_THRESHOLD;
};

const distanceBetweenPoints = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

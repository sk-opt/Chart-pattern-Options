/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Pattern {
  name: string;
  description: string;
  type: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
}

export interface OptionsLeg {
  type: 'call' | 'put';
  action: 'buy' | 'sell';
  strike: number;
  expiration: string;
}

export interface OptionsStrategy {
  name: string;
  description: string;
  legs: OptionsLeg[];
  entryPoint: string;
  exitPoint: string;
  pnlData: { price: number; profit: number }[];
}

export interface AnalysisResult {
  patterns: Pattern[];
  technicalElements: string[];
  implications: string;
  strategy: OptionsStrategy;
  priceHistory: { date: string; price: number }[];
}

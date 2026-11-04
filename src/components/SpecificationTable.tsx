import { Fragment } from 'react'
import type { Spec } from '@/data/types'

export function SpecificationTable({ specs }: { specs: Spec[] }) {
  let lastGroup: string | null = null

  return (
    <table className="w-full border-collapse text-sm">
      <caption className="sr-only">Technical specifications</caption>
      <tbody>
        {specs.map((spec, i) => {
          const showGroupHeader = spec.group !== lastGroup
          lastGroup = spec.group
          return (
            <Fragment key={`${spec.group}-${spec.label}-${i}`}>
              {showGroupHeader && (
                <tr>
                  <th
                    colSpan={2}
                    scope="colgroup"
                    className={`pb-2 text-left text-xs font-medium uppercase tracking-[0.08em] text-text-tertiary ${i === 0 ? 'pt-0' : 'pt-6'}`}
                  >
                    {spec.group}
                  </th>
                </tr>
              )}
              <tr className="border-b border-border-default">
                <th scope="row" className="w-2/5 py-3.5 pr-4 text-left font-medium text-text-secondary md:w-1/3">
                  {spec.label}
                </th>
                <td className="py-3.5 text-text-primary" style={{ overflowWrap: 'anywhere' }}>
                  {spec.value}
                </td>
              </tr>
            </Fragment>
          )
        })}
      </tbody>
    </table>
  )
}

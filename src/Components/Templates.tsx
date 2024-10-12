import { useLoaderData } from 'react-router-dom';
import TemplatePreviewCard from './TemplatePreviewCard';
import { HoverCard } from '@mantine/core';
import { IconFlag3 } from "@tabler/icons-react";

function Templates() {
  const { mfTemplates, userTemplates }: any = useLoaderData();

  return (
    <div>
      <div className="template-list">
        {
          mfTemplates.length > 0 && (
            <>
              {/* add tooltip that states that many templates come from https://mjml.io/templates */}
              {/* <h3 className='template-header'><Tooltip withArrow={true}
                withinPortal label={ }><span>{`Stock Templates`}</span></Tooltip></h3> */}
              <h3 className='template-header default'>
                <span>{`Stock Templates`}</span>
              <HoverCard width={280} shadow="md">
                <HoverCard.Target>
                  <IconFlag3 size={28} />
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <span>
                    These templates come from <a href="https://mjml.io/templates" target="_blank" rel="noopener noreferrer">MJML's public templates</a>
                  </span>
                </HoverCard.Dropdown>
              </HoverCard>
              </h3>

              <div className='templates-container'>
                {mfTemplates.map((template: any) => (
                  <TemplatePreviewCard template={template} source={"Stock"} />
                ))}
              </div>
            </>
          )
        }

        {
          userTemplates.length > 0 && (
            <>
              <h3 className='template-header'>Your Templates</h3>
              <div className='templates-container'>
                {userTemplates.map((template: any) => (
                  <TemplatePreviewCard template={template} source={"Your"} />
                ))}
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Templates
import { useLoaderData } from 'react-router-dom';
import TemplatePreviewCard from './TemplatePreviewCard';

function Templates() {
  const { mfTemplates, userTemplates }: any = useLoaderData();

  return (
    <div>
      <div className="template-list">
        {
          mfTemplates.length > 0 && (
            <>
              <h3 className='template-header'>Stock Templates</h3>
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
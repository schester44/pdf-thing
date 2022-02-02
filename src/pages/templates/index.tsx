import { useState } from "react";
import Router from "next/router";

import { omit } from "lodash";
import Layout from "@client/components/dashboard/Layout";
import { getSessionProject } from "@server/session";
import { NextPageContext } from "next";
import prisma from "src/db/prisma/client";
import invariant from "tiny-invariant";
import Button from "@client/components/dashboard/Button";
import CreateTemplatetModal from "@client/components/dashboard/CreateTemplateModal";
import { ProjectTemplate } from "@client/graphql/types.generated";

type Template = {
  id: string;
  name: string;
  key: string;
};

const Templates: React.FC<{ templates: Template[] }> = ({ templates, ...rest }) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  return (
    <Layout>
      <CreateTemplatetModal
        open={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={({ id }: ProjectTemplate) => {
          Router.push(`/editor/${id}`);
        }}
      />

      <div className="flex items-center justify-between">
        <h1>Templates</h1>

        <Button
          type="primary"
          onClick={() => {
            setCreateModalOpen(true);
          }}
        >
          New Template
        </Button>
      </div>

      {templates.map((template) => {
        return (
          <div key={template.id}>
            <h2>
              {template.name} ({template.key})
            </h2>
            <p>{template.id}</p>
          </div>
        );
      })}
    </Layout>
  );
};

export async function getServerSideProps({ req }: NextPageContext) {
  // TODO: we can simplify this. We don't care about the entire session project... but we do want its templates
  const userProject = await getSessionProject(req);

  invariant(userProject);

  const project = await prisma.project.findUnique({
    where: {
      id: userProject.project.id,
    },
    include: {
      ProjectTemplate: true,
    },
  });

  return {
    props: {
      templates: project?.ProjectTemplate?.map((t) => omit(t, ["createdAt"])),
    },
  };
}

export default Templates;

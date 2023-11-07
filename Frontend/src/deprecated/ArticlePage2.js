import React from 'react';
import { 
    Container,
    Grid,
    Typography,
    Button,
    List
} from '@mui/material';
import { Link } from 'react-router-dom';


const ArticlePage = ({ data, wikiname }) => {
    if (!data) {
        console.log("problem with data: " + data);
        return null;
    }
    if (!data.content) {
        console.log("problem with data.content: " + data.content);
        return null;
    }

    const content = JSON.parse(data.content);

    if (!content.sections || !Array.isArray(content.sections)) {
        console.log("problem with data.content.sections");
        console.log(data);


        return null;
    }

    return (
        <div>
            <Typography>{data.title}</Typography>

            <Link to={`/edit?wikiname=${wikiname}&title=${data.title}`}>
                <Button>EDIT</Button>
            </Link>
            {content.sections.map((section, index) => {
                if (section.type === 'plainSection') {
                    return (
                        <Section 
                            key={index}
                            title={section.title}
                            content={section.contentText}
                            wikiname={data.wikiname}
                        />
                    );
                } else if (section.type === 'plainImage') {
                    return (
                        <Image
                            key={index}
                            src={section.src}
                        />
                    );
                } else if (section.type === 'imageFrame1') {
                    return (
                        <ImageFrame1
                            key={index}
                            src={section.src}
                            content={section.contentText}
                            wikiname={data.wikiname}
                        />
                    );
                } else {
                    return null;
                }
            })}
            <Categories/>
        </div>
    );
};

const Section = ({ title, content, wikiname }) => {
    /*
    const contentString = Array.isArray(content) ? content.join(' ') : content;

    return (
        <Container>
            <h2>{title}</h2>
            <div>{parseContent(contentString, wikiname)}</div>
        </Container>
    )*/

    return (
        <Container>
            <h2>{title}</h2>
            {Array.isArray(content) ? (
                <List>
                    {content.map((item, index) => (
                        <li key={index}>{parseContent(item, wikiname)}</li>
                    ))}
                </List>
            ) : (
                <Grid item>{parseContent(content, wikiname)}</Grid>
            )}
        </Container>
    );
};

const parseContent = (content, wikiname) => {
    if (typeof content !== 'string') {
        return null;
    }

    const linkRegex = /\[\[(\w+)\]\]/g;
    const outlinkRegex = /\^\|\|^(.+?)\|\|\|(.+?)\^\|\|\^/g;

    
    
    const parsedContent1 = content.replace(linkRegex, (match, article) => (
        <Link to={`/wiki/${wikiname}/article/${article.replace(' ', '-')}`} key={article}>
            {article}
        </Link>
    ));
    
    const parsedContent2 = parsedContent1.replace(outlinkRegex, (match, url, linkText) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
            {linkText}
        </a>        
    ));

    return <p>{parsedContent2}</p>;
}

const Image = ({ src }) => {
    return <img src={src} alt="img_not_found" />;
}

const ImageFrame1 = ({ src, description, wikiname }) => {

}

const Categories = () => {
    return (
        <Grid>
            Categories should be handled in here.
        </Grid>
    );
}

export default ArticlePage;
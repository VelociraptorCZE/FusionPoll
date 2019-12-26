<?php
/**
 * Fusion Poll
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

namespace FusionPoll\API;

require __DIR__ . '/../autoload.php';

use Exception;
use FusionPoll\Model\EmailInformation;
use FusionPoll\Parser\EmailParser;
use Symfony\Component\Yaml\Yaml;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(500);
    die;
}

try {
    $parsedYaml = Yaml::parseFile(__DIR__ . '/../config/config.local.yml');
    $emailInfo = new EmailInformation($parsedYaml['emailPollResults']);
    $emailParser = new EmailParser;

    $name = $emailParser->getAnswerEntry()->getName();
    $days = $emailParser->getAnswerEntry()->getDays();

    if (!isset($name) || !isset($days)) {
        throw new Exception("Name or days are not defined");
    }

    mail(
        $emailInfo->getTo(),
        $emailInfo->getSubject() . $name,
        $emailParser->parseResponseToReadableFormat(),
        $emailInfo->getFrom()
    );

    echo json_encode(['result' => true]);
} catch (Exception $e) {
    echo json_encode(['result' => false]);
}
